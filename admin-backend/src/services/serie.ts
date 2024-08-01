import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  SSerieResponse,
  TSerieRequest,
  TSerieResponse,
  TSerieUpdate,
} from "../schemas";
import MediaServiceHelper from "../utils/mediaServiceHelper";

class SerieService {
  private static validateAndTransformSerie = (card: any): TSerieResponse => {
    return SSerieResponse.parse(card);
  };

  static create = async (data: TSerieRequest): Promise<TSerieResponse> => {
    const { title, description, release, active, categories, ageRating } = data;
    const serie = await prisma.serie.create({
      data: {
        title,
        description,
        release,
        active,
      },
    });

    await prisma.serieAgeRating.create({
      data: { serieId: serie.id, ageRatingId: ageRating.id },
    });

    const categoriesData = categories.map((category) => {
      return { serieId: serie.id, categoryId: category.id };
    });

    await prisma.serieCategory.createMany({
      data: categoriesData,
    });

    return this.validateAndTransformSerie(serie);
  };

  static uploadPoster = async (
    req: Request,
    mediaID: string,
    mediaType: "movie" | "serie"
  ): Promise<void> => {
    return MediaServiceHelper.uploadJustPoster(req, mediaID, mediaType);
  };

  static toggleActive = async (
    serieId: string,
    activeStatus: boolean
  ): Promise<void> => {
    await prisma.serie.update({
      where: { id: serieId },
      data: { active: !activeStatus },
    });
  };

  static update = async (
    id: string,
    data: TSerieUpdate
  ): Promise<TSerieResponse> => {
    const serie = await prisma.serie.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformSerie(serie);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.serie.delete({
      where: { id },
    });
  };
}

export { SerieService };
