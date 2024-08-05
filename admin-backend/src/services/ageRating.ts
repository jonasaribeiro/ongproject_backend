import prisma from "../config/prisma";
import {
  SAgeRatingResponse,
  TAgeRatingRequest,
  TAgeRatingResponse,
  TAgeRatingUpdate,
} from "../schemas";

class AgeRatingService {
  static create = async (
    data: TAgeRatingRequest
  ): Promise<TAgeRatingResponse> => {
    const ageRating = await prisma.ageRating.create({
      data: {
        ...data,
      },
    });
    return ageRating;
  };

  static getAll = async (): Promise<TAgeRatingResponse[]> => {
    const ageRatings = await prisma.ageRating.findMany({});

    return SAgeRatingResponse.array().parse(ageRatings);
  };

  static getById = async (id: string): Promise<TAgeRatingResponse> => {
    const ageRating = await prisma.ageRating.findUniqueOrThrow({
      where: { id },
    });
    return SAgeRatingResponse.parse(ageRating);
  };

  static update = async (
    id: string,
    data: TAgeRatingUpdate
  ): Promise<TAgeRatingResponse> => {
    const ageRating = await prisma.ageRating.update({
      where: { id },
      data: data,
    });
    return ageRating;
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.ageRating.delete({
      where: { id },
    });
  };
}

export { AgeRatingService };
