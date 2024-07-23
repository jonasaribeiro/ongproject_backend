import prisma from "../config/prisma";
import { SEpisodeResponse, TEpisodeResponse } from "../schemas";

class EpisodeService {
  static getAll = async (seasonId: string): Promise<TEpisodeResponse[]> => {
    if (seasonId) {
      const episodes = await prisma.episode.findMany({ where: { seasonId } });
      return episodes;
    } else {
      const episodes = await prisma.episode.findMany();
      return episodes;
    }
  };

  static getById = async (id: string): Promise<TEpisodeResponse> => {
    const episode = await prisma.episode.findUniqueOrThrow({
      where: { id },
    });

    return SEpisodeResponse.parse(episode);
  };
}

export { EpisodeService };
