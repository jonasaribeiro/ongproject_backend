import prisma from "../config/prisma";
import { SSeasonResponse, TSeasonResponse } from "../schemas";

class SeasonService {
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

    return SSeasonResponse.parse(season);
  };
}

export { SeasonService };
