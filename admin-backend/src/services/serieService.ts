import { Request, Response } from "express";
import prisma from "../config/prisma";
import { ValidationError } from "../errors/CustomErrors";
import MediaServiceHelper from "../utils/mediaServiceHelper";
import { TEpisodeRequest, TEpisodeResponse, TSeasonRequest } from "../schemas";

class SerieService {
  static async createSerieEntity(data: {
    title: string;
    description: string;
    release: string;
    categories: { name: string }[];
    ageRating: { name: string };
  }): Promise<string> {
    console.log("Dados recebidos no createSerieEntity:", data);

    const { title, description, release, categories, ageRating } = data;

    if (!title) {
      throw new ValidationError("Title is required");
    }

    if (!release) {
      throw new ValidationError("Release year is required");
    }

    if (!ageRating || !ageRating.name) {
      throw new ValidationError("Age rating is required");
    }

    if (!categories || categories.length === 0) {
      throw new ValidationError("At least one genre is required");
    }

    // Upsert age rating
    const serieAgeRating = await prisma.ageRating.upsert({
      where: { name: ageRating.name },
      update: {},
      create: { name: ageRating.name },
    });

    // Upsert genres
    const categoriesPromises = categories.map(async (category) => {
      return await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });
    });

    const categoriesResults = await Promise.all(categoriesPromises);

    // Create serie with relationships
    const serie = await prisma.serie.create({
      data: {
        title,
        description,
        release,
      },
    });

    await prisma.serieAgeRating.create({
      data: { serieId: serie.id, ageRatingId: serieAgeRating.id },
    });

    const categoriesData = categoriesResults.map((category) => {
      return { serieId: serie.id, categoryId: category.id };
    });

    await prisma.serieCategory.createMany({
      data: categoriesData,
    });

    return serie.id;
  }

  static async addSeason(data: TSeasonRequest): Promise<string> {
    if (!data.seasonNumber) {
      throw new ValidationError("Season number is required");
    }

    const season = await prisma.season.create({
      data: {
        ...data,
      },
    });

    return season.id;
  }

  static async createEpisodeEntity(
    data: TEpisodeRequest
  ): Promise<TEpisodeResponse> {
    if (!data.episodeNumber) {
      throw new ValidationError("Episode number is required");
    }

    if (!data.title) {
      throw new ValidationError("Title is required");
    }

    const episode = await prisma.episode.create({
      data: {
        ...data,
      },
    });

    return episode;
  }

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

  static async activateSerie(serieId: string): Promise<void> {
    await prisma.serie.update({
      where: { id: serieId },
      data: { active: true },
    });
  }

  static async activateSeason(
    serieId: string,
    seasonNumber: number
  ): Promise<void> {
    await prisma.season.updateMany({
      where: {
        serieId: serieId,
        seasonNumber: seasonNumber,
      },
      data: { active: true },
    });
  }
}

export default SerieService;
