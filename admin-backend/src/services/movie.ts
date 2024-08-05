import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  SMovieResponse,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
} from "../schemas";
import MediaServiceHelper from "../utils/mediaServiceHelper";

class MovieService {
  private static validateAndTransformMovie = (movie: any): TMovieResponse => {
    return SMovieResponse.parse(movie);
  };

  static create = async (data: TMovieRequest): Promise<TMovieResponse> => {
    const { title, description, release, active, categories, ageRating } = data;
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        release,
        active,
      },
    });

    await prisma.movieAgeRating.create({
      data: { movieId: movie.id, ageRatingId: ageRating.id },
    });

    const categoriesData = categories.map((category) => {
      return { movieId: movie.id, categoryId: category.id };
    });

    await prisma.movieCategory.createMany({
      data: categoriesData,
    });

    return this.validateAndTransformMovie(movie);
  };

  static async uploadFiles(
    req: Request,
    res: Response,
    movieId: string,
    type: "movie" | "serie"
  ): Promise<any> {
    const result = await MediaServiceHelper.uploadFiles(
      req,
      res,
      movieId,
      type
    );

    const resolutionNames: string[] = [];
    if (result.resolutions.sd) resolutionNames.push("SD");
    if (result.resolutions.hd) resolutionNames.push("HD");
    if (result.resolutions._4k) resolutionNames.push("4K");

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

  static async toggleActive(
    movieId: string,
    activeStatus: boolean
  ): Promise<void> {
    await prisma.movie.update({
      where: { id: movieId },
      data: { active: !activeStatus },
    });
  }

  static update = async (
    id: string,
    data: TMovieUpdate
  ): Promise<TMovieResponse> => {
    const movie = await prisma.movie.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformMovie(movie);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.movie.delete({
      where: { id },
    });
  };
}

export { MovieService };
