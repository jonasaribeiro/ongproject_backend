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
    pubYear: string;
    genres: { name: string }[];
    ageRating: { description: string };
  }): Promise<string> => {
    console.log("Dados recebidos no createMovieEntity:", data);

    const { title, description, pubYear, genres, ageRating } = data;

    if (!title) {
      throw new ValidationError("Title is required");
    }

    if (!pubYear) {
      throw new ValidationError("Publication year is required");
    }

    if (!ageRating || !ageRating.description) {
      throw new ValidationError("Age rating is required");
    }

    if (!genres || genres.length === 0) {
      throw new ValidationError("At least one genre is required");
    }

    // Upsert age rating
    const movieAgeRating = await prisma.movieAgeRating.upsert({
      where: { description: ageRating.description },
      update: {},
      create: { description: ageRating.description },
    });

    // Upsert genres
    const genrePromises = genres.map(async (genre) => {
      return await prisma.movieGenre.upsert({
        where: { name: genre.name },
        update: {},
        create: { name: genre.name },
      });
    });

    const genreResults = await Promise.all(genrePromises);

    // Create movie with relationships
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        pubYear,
        ageRating: {
          connect: { id: movieAgeRating.id },
        },
        genres: {
          connect: genreResults.map((genre) => ({ id: genre.id })),
        },
      },
    });

    return movie.id;
  };

  static async uploadPoster(
    posterFile: Express.Multer.File,
    movieDir: string
  ): Promise<void> {
    const unprocessedDir = path.join(databasePath, "unprocessed");
    FileHelper.createDirectory(unprocessedDir);

    const imagesDir = path.join(movieDir, "images");
    FileHelper.createDirectory(imagesDir);

    let posterFilePath = "";
    if (posterFile) {
      posterFilePath = path.join(
        unprocessedDir,
        Date.now() + "_" + posterFile.originalname
      );
      await FileHelper.moveFile(posterFile.path, posterFilePath);

      // Optimize and move the poster file to the images directory
      const optimizedPosterPath = path.join(imagesDir, "poster.jpg");
      await FileHelper.optimizeImage(posterFilePath, optimizedPosterPath);

      // Delete the temporary file after processing
      console.log(`Tentando deletar poster temporário: ${posterFilePath}`);
      await FileHelper.deleteTempPoster(posterFilePath);
    }
  }

  static async uploadMovie(
    mainFile: Express.Multer.File,
    movieId: string,
    movieDir: string,
    mainDir: string
  ): Promise<void> {
    const unprocessedDir = path.join(databasePath, "unprocessed");
    FileHelper.createDirectory(unprocessedDir);

    let tempFilePath = "";
    if (mainFile) {
      tempFilePath = path.join(
        unprocessedDir,
        Date.now() + "_" + mainFile.originalname
      );
      await FileHelper.moveFile(mainFile.path, tempFilePath);

      const resolutions = await FileHelper.processVideoFile(
        { path: tempFilePath, originalname: mainFile.originalname },
        movieDir,
        "main"
      );

      const audioDir = path.join(mainDir, "audio");
      FileHelper.createDirectory(audioDir);
      await FileHelper.extractAudio(tempFilePath, audioDir);

      // Delete the temporary file after processing
      await FileHelper.deleteTempMovie(tempFilePath);

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
    }
  }

  static async uploadFiles(
    req: Request,
    res: Response,
    movieId: string
  ): Promise<any> {
    if (!req.files) {
      throw new ValidationError("Files are missing");
    }

    const { title } = req.body;
    if (!title) {
      throw new ValidationError("Title is required");
    }

    const movieDir = path.join(databasePath, "movies", movieId);
    const mainDir = path.join(movieDir, "main");
    FileHelper.createDirectory(movieDir);
    FileHelper.createDirectory(mainDir);

    (req as any).movieDir = movieDir;
    (req as any).movieId = movieId;

    const files = req.files as IMulterUploadFiles;
    const mainFile = files.file ? files.file[0] : null;
    const posterFile = files.poster ? files.poster[0] : null;

    if (posterFile) {
      await MoviesService.uploadPoster(posterFile, movieDir);
    }

    if (mainFile) {
      await MoviesService.uploadMovie(mainFile, movieId, movieDir, mainDir);
    }

    return {
      message: "Files uploaded successfully",
    };
  }
}

export default MoviesService;
