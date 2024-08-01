import { Request, Response } from "express";
import prisma from "../config/prisma";
import { ValidationError } from "../errors/CustomErrors";
import MediaServiceHelper from "../utils/mediaServiceHelper";

class MovieService {
  static createMovieEntity = async (data: {
    title: string;
    description: string;
    release: string;
    categories: { name: string }[];
    ageRating: { name: string };
  }): Promise<string> => {
    console.log("Dados recebidos no createMovieEntity:", data);

    const { title, description, release, categories, ageRating } = data;

    if (!title) {
      throw new ValidationError("Title is required");
    }

    if (!release) {
      throw new ValidationError("Publication year is required");
    }

    if (!ageRating || !ageRating.name) {
      throw new ValidationError("Age rating is required");
    }

    if (!categories || categories.length === 0) {
      throw new ValidationError("At least one genre is required");
    }

    // Upsert age rating
    const movieAgeRating = await prisma.ageRating.upsert({
      where: { name: ageRating.name },
      update: {},
      create: { name: ageRating.name },
    });

    // Upsert genres
    const categoriesPromises = categories.map(async (category) => {
      return await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });
    });

    const categoriesResults = await Promise.all(categoriesPromises);

    // Create movie with relationships
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        release,
      },
    });

    await prisma.movieAgeRating.create({
      data: { movieId: movie.id, ageRatingId: movieAgeRating.id },
    });

    const categoriesData = categoriesResults.map((category) => {
      return { movieId: movie.id, categoryId: category.id };
    });

    await prisma.movieCategory.createMany({
      data: categoriesData,
    });

    return movie.id;
  };

  static async uploadPoster(
    posterFile: Express.Multer.File,
    movieDir: string
  ): Promise<void> {
    return MediaServiceHelper.uploadPoster(posterFile, movieDir);
  }

  static async uploadMovie(
    mainFile: Express.Multer.File,
    movieId: string,
    movieDir: string,
    mainDir: string
  ): Promise<void> {
    const resolutions = await MediaServiceHelper.processMediaFile(
      mainFile,
      movieDir,
      mainDir
    );

    // Atualiza resoluções no banco de dados
    const resolutionNames: string[] = [];
    if (resolutions.sd) resolutionNames.push("SD");
    if (resolutions.hd) resolutionNames.push("HD");
    if (resolutions._4k) resolutionNames.push("4K");

    // Buscar ou criar resoluções e vincular ao filme
    for (const name of resolutionNames) {
      const resolution = await prisma.resolution.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      await prisma.resolutionMovie.create({
        data: {
          movieId,
          resolutionId: resolution.id,
        },
      });
    }
  }

  static async uploadFiles(
    req: Request,
    res: Response,
    movieId: string
  ): Promise<any> {
    const result = await MediaServiceHelper.uploadFiles(
      req,
      res,
      movieId,
      "movie"
    );

    // Atualiza resoluções no banco de dados
    const resolutionNames: string[] = [];
    if (result.resolutions.sd) resolutionNames.push("SD");
    if (result.resolutions.hd) resolutionNames.push("HD");
    if (result.resolutions._4k) resolutionNames.push("4K");

    // Buscar ou criar resoluções e vincular ao filme
    for (const name of resolutionNames) {
      const resolution = await prisma.resolution.upsert({
        where: { name },
        update: {},
        create: { name },
      });

      await prisma.resolutionMovie.create({
        data: { resolutionId: resolution.id, movieId },
      });
    }

    return {
      message: "Files uploaded successfully",
    };
  }

  static async activateMovie(movieId: string): Promise<void> {
    await prisma.movie.update({
      where: { id: movieId },
      data: { active: true },
    });
  }
}

export default MovieService;
