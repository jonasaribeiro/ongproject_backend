import prisma from "../config/prisma";
import {
  SSeasonResponse,
  TSeasonRequest,
  TSeasonResponse,
  TSeasonUpdate,
} from "../schemas";

class SeasonService {
  private static validateAndTransformSeason = (card: any): TSeasonResponse => {
    return SSeasonResponse.parse(card);
  };

  static create = async (data: TSeasonRequest): Promise<TSeasonResponse> => {
    const season = await prisma.season.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformSeason(season);
  };

  static getAll = async (serieId: string): Promise<TSeasonResponse[]> => {
    if (serieId) {
      const seasons = await prisma.season.findMany({ where: { serieId } });
      return seasons;
    } else {
      const seasons = await prisma.season.findMany();
      return seasons;
    }
  };

  static getById = async (id: string): Promise<TSeasonResponse> => {
    const season = await prisma.season.findUniqueOrThrow({
      where: { id },
    });

    return this.validateAndTransformSeason(season);
  };

  static update = async (
    id: string,
    data: TSeasonUpdate
  ): Promise<TSeasonResponse> => {
    const season = await prisma.season.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformSeason(season);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.season.delete({
      where: { id },
    });
  };
}

export { SeasonService };
