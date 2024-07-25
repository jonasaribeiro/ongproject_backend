import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class AgeRatingMiddleware {
  static ageRatingExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const ageRating = await prisma.ageRating.findFirst({
      where: {
        id,
      },
    });

    if (!ageRating) {
      throw new AppError("Age rating not found", 404);
    }

    return next();
  };

  static ageRatingNameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;

    const ageRating = await prisma.ageRating.findFirst({
      where: {
        name,
      },
    });

    if (ageRating) {
      throw new AppError("Age rating already exists", 409);
    }

    return next();
  };
}

export { AgeRatingMiddleware };
