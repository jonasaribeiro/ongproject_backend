import prisma from "../config/prisma";
import {
  SMovieResponse,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
} from "../schemas";

class MovieService {
  static getAll = async (): Promise<TMovieResponse[]> => {
    const movies = await prisma.movie.findMany();
    return SMovieResponse.array().parse(movies);
  };

  static getById = async (id: string): Promise<TMovieResponse> => {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: { id },
    });

    return SMovieResponse.parse(movie);
  };
}

export { MovieService };
