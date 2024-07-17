import prisma from "../config/prisma";
import {
  SWatchingMovieResponse,
  TWatchingMovieRequest,
  TWatchingMovieResponse,
} from "../schemas";

class WatchingMovieService {
  static create = async (
    data: TWatchingMovieRequest
  ): Promise<TWatchingMovieResponse> => {
    const watching = await prisma.watchingMovie.create({
      data: {
        ...data,
      },
    });
    return SWatchingMovieResponse.parse(watching);
  };

  static getAll = async (
    profileId: string
  ): Promise<TWatchingMovieResponse[]> => {
    const watchingMovies = await prisma.watchingMovie.findMany({
      where: { profileId },
    });

    return SWatchingMovieResponse.array().parse(watchingMovies);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.watchingMovie.delete({
      where: { id },
    });
  };
}

export { WatchingMovieService };
