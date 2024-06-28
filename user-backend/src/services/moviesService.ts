import prisma from "../config/prisma";

class MovieService {
  static async getMovies(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      skip,
      take: pageSize,
    });
    return movies;
  }

  static async getMoviesByGenre(genre: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      where: {
        genres: {
          some: {
            name: genre,
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
          description: ageRating,
        },
      },
      skip,
      take: pageSize,
    });
    return movies;
  }

  static async getMoviesByGenreAndAgeRating(
    genre: string,
    ageRating: string,
    page: number,
    pageSize: number
  ) {
    const skip = (page - 1) * pageSize;
    const movies = await prisma.movie.findMany({
      where: {
        genres: {
          some: {
            name: genre,
          },
        },
        ageRating: {
          description: ageRating,
        },
      },
      skip,
      take: pageSize,
    });
    return movies;
  }
}

export default MovieService;
