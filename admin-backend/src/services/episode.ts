import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  SEpisodeResponse,
  TEpisodeRequest,
  TEpisodeResponse,
  TEpisodeUpdate,
} from "../schemas";
import MediaServiceHelper from "../utils/mediaServiceHelper";

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
      include: { season: true },
    });
    return episode;
  };

  static async uploadEpisodeFiles(
    req: Request,
    res: Response,
    serieId: string,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<any> {
    const result = await MediaServiceHelper.uploadFiles(
      req,
      res,
      `${serieId}/seasons/${seasonNumber}/episodes/${episodeNumber}`,
      "serie"
    );

    return {
      message: "Files uploaded successfully",
    };
  }

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
