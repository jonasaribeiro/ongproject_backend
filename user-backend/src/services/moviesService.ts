import path from "path";
import fs from "fs/promises";
import prisma from "../config/prisma";

class MovieService {
  /*
  static async getMovies(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      skip,
      take: pageSize,
    });
    return movies;
  }

  static async getMoviesByCategory(
    category: string,
    page: number,
    pageSize: number
  ) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      where: {
        categories: {
          some: {
            name: category,
          },
        },
      },
      skip,
      take: pageSize,
    });
    return movies;
  }

  static async getMoviesByAgeRating(
    ageRating: string,
    page: number,
    pageSize: number
  ) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      where: {
        ageRating: {
          name: ageRating,
        },
      },
      skip,
      take: pageSize,
    });
    return movies;
  }

  static async getMoviesByCategoryAndAgeRating(
    category: string,
    ageRating: string,
    page: number,
    pageSize: number
  ) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      where: {
        categories: {
          some: {
            name: category,
          },
        },
        ageRating: {
          name: ageRating,
        },
      },
      skip,
      take: pageSize,
    });
    return movies;
  }
*/
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

export default MovieService;
