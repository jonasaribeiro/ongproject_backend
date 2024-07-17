import prisma from "../config/prisma";
import { SSerieResponse, TSerieResponse } from "../schemas";

class SerieService {
  static getAll = async (): Promise<TSerieResponse[]> => {
    const series = await prisma.serie.findMany();
    return series;
  };

  static getById = async (id: string): Promise<TSerieResponse> => {
    const serie = await prisma.serie.findUniqueOrThrow({
      where: { id },
    });

    return SSerieResponse.parse(serie);
  };
}

export { SerieService };
