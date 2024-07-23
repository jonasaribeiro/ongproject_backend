import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class SeasonMiddleware {
  static seasonExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const season = await prisma.season.findFirst({
      where: {
        id,
      },
    });

    if (!season) {
      throw new AppError("Season not found", 404);
    }

    return next();
  };

  static seasonTitleExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { title } = req.body;

    const season = await prisma.season.findFirst({
      where: {
        title,
      },
    });

    if (season) {
      throw new AppError("Season title already exists", 409);
    }

    return next();
  };
}

export { SeasonMiddleware };
