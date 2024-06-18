import { NextFunction, Request, Response } from "express";
import * as CustomErrors from "./CustomErrors";
import { ZodError } from "zod";
import path from "path";
import prisma from "../config/prisma";
import FileHelper from "../utils/fileHelper";

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

    if (movieId) {
      console.log("Verificando se há arquivos a ser deletado");
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

    return res.status(status).json({ message });
  }
}

export default ErrorHandler;
