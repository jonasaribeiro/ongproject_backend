import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import prisma from "../config/prisma";
import { ValidationError } from "../errors/CustomErrors";
import processFile from "../utils/processFile";
import { databasePath } from "../config/multer";
import { IMulterUploadFiles } from "../types/movieTypes";

class MoviesService {
  static upload = async (req: Request, res: Response): Promise<any> => {
    if (!req.files) {
      throw new ValidationError("Files are missing");
    }

    const { title, description, pubDate } = req.body;
    if (!title) {
      throw new ValidationError("Title is required");
    }

    const titleFolder = title.replace(/\s+/g, "_");
    const movieDir = path.join(databasePath, "movies", titleFolder);

    if (!fs.existsSync(movieDir)) {
      fs.mkdirSync(movieDir, { recursive: true });
    }

    // Adicionando movieDir ao req para acesso no ErrorHandler
    (req as any).movieDir = movieDir;

    const files = req.files as IMulterUploadFiles;

    const mainFile = files.file ? files.file[0] : null;
    const cartazFiles = files.images_cartaz || [];
    const thumbnailsFiles = files.images_thumbnails || [];
    const promoFiles = files.images_promo || [];

    const mainPaths = mainFile
      ? await processFile(mainFile, movieDir, "main")
      : { sd: null, hd: null, _4k: null };

    const cartazPaths = (await Promise.all(
      cartazFiles.map((file) => processFile(file, movieDir, "images/cartaz"))
    )) as string[];

    const thumbnailsPaths = (await Promise.all(
      thumbnailsFiles.map((file) =>
        processFile(file, movieDir, "images/thumbnails")
      )
    )) as string[];

    const promoPaths = (await Promise.all(
      promoFiles.map((file) => processFile(file, movieDir, "images/promo"))
    )) as string[];

    const video = await prisma.movie.create({
      data: {
        title,
        description,
        pubDate: new Date(pubDate),
        mainPathSD: typeof mainPaths === "object" ? mainPaths.sd : null,
        mainPathHD: typeof mainPaths === "object" ? mainPaths.hd : null,
        mainPath4K: typeof mainPaths === "object" ? mainPaths._4k : null,
        cartazPaths,
        thumbnailsPaths,
        promoPaths,
      },
    });

    return video;
  };
}

export default MoviesService;
