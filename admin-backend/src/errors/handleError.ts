import { NextFunction, Request, Response } from "express";
import * as CustomErrors from "./CustomErrors";
import { ZodError } from "zod";
import path from "path";
import prisma from "../config/prisma";
import FileHelper from "../utils/fileHelper";
import fs from "fs";

class ErrorHandler {
  private static defaultErrorMapper(err: any) {
    return {
      status: err.statusCode || 500,
      message: err.message || "Internal Server Error",
    };
  }

  private static errorMap: {
    [key: string]: (err: any) => { status: number; message: any };
  } = {
    [CustomErrors.ExpiredTokenError.name]: (err) => ({
      status: err.statusCode,
      message: { info: err.message, expiredIn: err.expiredIn },
    }),
    [ZodError.name]: (err: ZodError) => ({
      status: 400,
      message: err.flatten().fieldErrors,
    }),
  };

  static async handle(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const errorType = err.constructor.name;
    const errorHandler =
      ErrorHandler.errorMap[errorType] || ErrorHandler.defaultErrorMapper;
    const { status, message } = errorHandler(err);

    console.log("Lançou algum erro");
    console.log(`status: ${status}`);
    console.log(`message: ${message}`);

    const movieId = (req as any).movieId;
    const serieId = (req as any).serieId;
    const seasonNumber = (req as any).seasonNumber;
    const episodeNumber = (req as any).episodeNumber;
    const unprocessedPath = path.join(
      __dirname,
      "../../../database/unprocessed"
    );

    // try {
    //   if (movieId) {
    //     await ErrorHandler.deleteMovie(movieId);
    //   }

    //   if (
    //     serieId &&
    //     seasonNumber !== undefined &&
    //     episodeNumber !== undefined
    //   ) {
    //     await ErrorHandler.deleteEpisode(serieId, seasonNumber, episodeNumber);
    //   }

    //   if (req.files) {
    //     const files = req.files as Express.Multer.File[];
    //     for (const file of files) {
    //       const filePath = path.join(unprocessedPath, file.filename);
    //       if (fs.existsSync(filePath)) {
    //         console.log("Deletando arquivo não processado " + filePath);
    //         await FileHelper.deleteTempMovie(filePath);
    //       }
    //     }
    //   }
    // } catch (deleteError) {
    //   console.error(
    //     "Erro ao deletar arquivos ou dados do banco de dados:",
    //     deleteError
    //   );
    // }

    return res.status(status).json({ message });
  }

  private static async deleteMovie(movieId: string): Promise<void> {
    console.log("Verificando se há arquivos a ser deletado para o filme");
    const folderPath = path.join(
      __dirname,
      "../../../database/movies",
      movieId
    );

    // Delete folder
    console.log("Deletando pasta " + folderPath);
    await FileHelper.deleteFolderRecursive(folderPath);
    console.log("Pasta deletada");

    // Delete movie from the database
    console.log("Deletando filme do banco de dados");
    await prisma.movie.delete({ where: { id: movieId } });
    console.log("Filme deletado do banco de dados");
  }

  private static async deleteEpisode(
    serieId: string,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<void> {
    console.log(
      "Verificando se há arquivos a ser deletado para o episódio da série"
    );
    const folderPath = path.join(
      __dirname,
      "../../../database/series",
      serieId,
      seasonNumber.toString(),
      episodeNumber.toString()
    );

    // Delete folder
    console.log("Deletando pasta " + folderPath);
    await FileHelper.deleteFolderRecursive(folderPath);
    console.log("Pasta deletada");

    // Find and delete episode from the database
    console.log("Procurando episódio no banco de dados");
    const episode = await prisma.episode.findFirst({
      where: {
        season: {
          serieId: serieId,
          seasonNumber: seasonNumber,
        },
        episodeNumber: episodeNumber,
      },
    });

    if (episode) {
      console.log("Deletando episódio do banco de dados");
      await prisma.episode.delete({ where: { id: episode.id } });
      console.log("Episódio deletado do banco de dados");
    }
  }
}

export default ErrorHandler;
