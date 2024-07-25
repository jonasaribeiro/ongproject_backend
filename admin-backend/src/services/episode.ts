import prisma from "../config/prisma";
import {
  SEpisodeResponse,
  TEpisodeRequest,
  TEpisodeResponse,
  TEpisodeUpdate,
} from "../schemas";

class EpisodeService {
  private static validateAndTransformEpisode = (
    episode: any
  ): TEpisodeResponse => {
    return SEpisodeResponse.parse(episode);
  };

  static create = async (data: TEpisodeRequest): Promise<TEpisodeResponse> => {
    const episode = await prisma.episode.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformEpisode(episode);
  };

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

    return this.validateAndTransformEpisode(episode);
  };

  static update = async (
    id: string,
    data: TEpisodeUpdate
  ): Promise<TEpisodeResponse> => {
    const episode = await prisma.episode.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformEpisode(episode);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.episode.delete({
      where: { id },
    });
  };
}

export { EpisodeService };
