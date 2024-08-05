import prisma from "../config/prisma";
import { SEpisodeResponse, TEpisodeResponse } from "../schemas";
import path from "path";
import fs from "fs/promises";

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

  static async getEpisodePosterPath(
    serieId: string,
    seasonNumber: string,
    episodeNumber: string
  ): Promise<string | null> {
    const imagePath = path.join(
      __dirname,
      `../../database/series/${serieId}/seasons/${seasonNumber}/episodes/${episodeNumber}/images/poster.jpg`
    );
    const exists = await EpisodeService.fileExists(imagePath);
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

export { EpisodeService };
