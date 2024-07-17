import prisma from "../config/prisma";
import { SAgeRatingResponse, TAgeRatingResponse } from "../schemas";

class AgeRatingService {
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
}

export { AgeRatingService };
