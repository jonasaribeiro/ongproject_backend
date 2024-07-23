import prisma from "../config/prisma";
import { SSerieResponse, TSerieResponse } from "../schemas";

class SerieService {
  static getAll = async (
    categoryId?: string,
    ageId?: string
  ): Promise<TSerieResponse[]> => {
    if (categoryId && ageId) {
      const series = await prisma.movie.findMany({
        where: {
          AND: [
            {
              categories: {
                some: {
                  categoryId: categoryId,
                },
              },
            },
            {
              ageRatings: {
                some: {
                  ageRatingId: ageId,
                },
              },
            },
          ],
        },
      });
      return SSerieResponse.array().parse(series);
    } else if (ageId) {
      const series = await prisma.movie.findMany({
        where: {
          ageRatings: {
            some: {
              ageRatingId: ageId,
            },
          },
        },
      });
      return SSerieResponse.array().parse(series);
    } else if (categoryId) {
      const series = await prisma.serie.findMany({
        where: {
          categories: {
            some: {
              categoryId: categoryId,
            },
          },
        },
      });
      return SSerieResponse.array().parse(series);
    } else {
      const series = await prisma.movie.findMany();
      return SSerieResponse.array().parse(series);
    }
  };

  static getById = async (id: string): Promise<TSerieResponse> => {
    const serie = await prisma.serie.findUniqueOrThrow({
      where: { id },
    });

    return SSerieResponse.parse(serie);
  };
}

export { SerieService };
