import prisma from "../config/prisma";
import {
  SWatchingSerieResponse,
  TWatchingSerieRequest,
  TWatchingSerieResponse,
} from "../schemas";

class WatchingSerieService {
  private static validateAndTransformWatchingSerie = (
    watching: any
  ): TWatchingSerieResponse => {
    return SWatchingSerieResponse.parse(watching);
  };

  static create = async (
    data: TWatchingSerieRequest
  ): Promise<TWatchingSerieResponse> => {
    const watching = await prisma.watchingSerie.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformWatchingSerie(watching);
  };

  static getAll = async (
    profileId: string
  ): Promise<TWatchingSerieResponse[]> => {
    const watchingMovies = await prisma.watchingSerie.findMany({
      where: { profileId },
    });

    return SWatchingSerieResponse.array().parse(watchingMovies);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.watchingSerie.delete({
      where: { id },
    });
  };
}

export { WatchingSerieService };
