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

  static toggleActive = async (
    seasonId: string,
    activeStatus: boolean
  ): Promise<void> => {
    await prisma.season.update({
      where: { id: seasonId },
      data: { active: !activeStatus },
    });
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
