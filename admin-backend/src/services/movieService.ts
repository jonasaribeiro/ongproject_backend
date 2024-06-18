import { Request, Response } from "express";
import path from "path";
import prisma from "../config/prisma";
import { ValidationError } from "../errors/CustomErrors";
import { databasePath } from "../config/multer";
import { IMulterUploadFiles } from "../types/movieTypes";
import FileHelper from "../utils/fileHelper";

class MoviesService {
  static createMovieEntity = async (data: {
    title: string;
    description: string;
    pubDate: string;
  }): Promise<string> => {
    const { title, description, pubDate } = data;

    if (!title) {
      throw new ValidationError("Title is required");
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        pubDate: new Date(pubDate),
      },
    });

    return movie.id;
  };

  static uploadFiles = async (
    req: Request,
    res: Response,
    movieId: string
  ): Promise<any> => {
    if (!req.files) {
      throw new ValidationError("Files are missing");
    }

    const { title } = req.body;
    if (!title) {
      throw new ValidationError("Title is required");
    }

    const unprocessedDir = path.join(databasePath, "unprocessed");
    FileHelper.createDirectory(unprocessedDir);

    const movieDir = path.join(databasePath, "movies", movieId);
    const mainDir = path.join(movieDir, "main");
    FileHelper.createDirectory(movieDir);
    FileHelper.createDirectory(mainDir);

    (req as any).movieDir = movieDir;
    (req as any).movieId = movieId;

    const files = req.files as IMulterUploadFiles;
    const mainFile = files.file ? files.file[0] : null;

    let tempFilePath = "";
    if (mainFile) {
      tempFilePath = path.join(
        unprocessedDir,
        Date.now() + "_" + mainFile.originalname
      );
      FileHelper.moveFile(mainFile.path, tempFilePath);
    }

    const resolutions = mainFile
      ? await FileHelper.processVideoFile(
          { path: tempFilePath, originalname: mainFile.originalname },
          movieDir,
          "main"
        )
      : { sd: false, hd: false, _4k: false };

    const audioDir = path.join(mainDir, "audio");
    FileHelper.createDirectory(audioDir);
    if (mainFile) {
      await FileHelper.extractAudio(tempFilePath, audioDir);
    }

    // Delete the temporary file after processing
    if (tempFilePath) {
      FileHelper.deleteFile(tempFilePath);
    }

    // Atualiza resoluções no banco de dados
    const resolutionNames: string[] = [];
    if (resolutions.sd) resolutionNames.push("SD");
    if (resolutions.hd) resolutionNames.push("HD");
    if (resolutions._4k) resolutionNames.push("4K");

    // Buscar ou criar resoluções e vincular ao filme
    for (const name of resolutionNames) {
      const resolution = await prisma.movieResolution.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      await prisma.movie.update({
        where: { id: movieId },
        data: {
          resolutions: {
            connect: { id: resolution.id },
          },
        },
      });
    }

    return {
      resolutions,
    };
  };
}

export default MoviesService;
