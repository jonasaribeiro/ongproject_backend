import prisma from "../config/prisma";
import {
  SMovieResponse,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
} from "../schemas";

class MovieService {
  private static validateAndTransformMovie = (card: any): TMovieResponse => {
    return SMovieResponse.parse(card);
  };

  static create = async (data: TMovieRequest): Promise<TMovieResponse> => {
    const movie = await prisma.movie.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformMovie(movie);
  };

  static getAll = async (
    categoryId?: string,
    ageId?: string
  ): Promise<TMovieResponse[]> => {
    if (categoryId && ageId) {
      const movies = await prisma.movie.findMany({
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
      return SMovieResponse.array().parse(movies);
    } else if (ageId) {
      const movies = await prisma.movie.findMany({
        where: {
          categories: {
            some: {
              categoryId: categoryId,
            },
          },
        },
      });
      return SMovieResponse.array().parse(movies);
    } else if (categoryId) {
      const movies = await prisma.category.findMany({
        where: { id: categoryId },
        select: { movieCategories: { select: { movie: true } } },
      });
      return SMovieResponse.array().parse(movies);
    } else {
      const movies = await prisma.movie.findMany();
      return SMovieResponse.array().parse(movies);
    }
  };

  static getById = async (id: string): Promise<TMovieResponse> => {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: { id },
    });

    return SMovieResponse.parse(movie);
  };

  static update = async (
    id: string,
    data: TMovieUpdate
  ): Promise<TMovieResponse> => {
    const movie = await prisma.movie.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformMovie(movie);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.movie.delete({
      where: { id },
    });
  };
}

export { MovieService };
