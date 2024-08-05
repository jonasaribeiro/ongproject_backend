import prisma from "../config/prisma";
import { SMovieResponse, TMovieResponse } from "../schemas";
import path from "path";
import fs from "fs/promises";

class MovieService {
  static getAll = async (
    categoryId?: string,
    ageId?: string
  ): Promise<TMovieResponse[]> => {
    if (categoryId && ageId) {
      const movies = await prisma.movie.findMany({
        where: {
          AND: [
            {
              categories: {
                some: {
                  categoryId: categoryId,
                },
              },
            },
            {
              ageRatings: {
                some: {
                  ageRatingId: ageId,
                },
              },
            },
          ],
        },
      });
      return SMovieResponse.array().parse(movies);
    } else if (ageId) {
      const movies = await prisma.movie.findMany({
        where: {
          categories: {
            some: {
              categoryId: categoryId,
            },
          },
        },
      });
      return SMovieResponse.array().parse(movies);
    } else if (categoryId) {
      const movies = await prisma.category.findMany({
        where: { id: categoryId },
        select: { movieCategories: { select: { movie: true } } },
      });
      return SMovieResponse.array().parse(movies);
    } else {
      const movies = await prisma.movie.findMany();
      return SMovieResponse.array().parse(movies);
    }
  };

  static getById = async (id: string): Promise<TMovieResponse> => {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: { id },
    });

    return SMovieResponse.parse(movie);
  };

  static async getMoviePosterPath(movieId: string): Promise<string | null> {
    const imagePath = path.join(
      __dirname,
      `../../database/movies/${movieId}/images/poster.jpg`
    );

    const exists = await MovieService.fileExists(imagePath);
    if (exists) {
      return imagePath;
    } else {
      return null;
    }
  }

  private static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      console.error("Error accessing file:", error);
      return false;
    }
  }
}

export { MovieService };
