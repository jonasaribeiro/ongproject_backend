import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class SerieMiddleware {
  static serieExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const serie = await prisma.serie.findFirst({
      where: {
        id,
      },
    });

    if (!serie) {
      throw new AppError("Serie not found", 404);
    }

    return next();
  };

  static serieTitleExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { title } = req.body;

    const serie = await prisma.serie.findFirst({
      where: {
        title,
      },
    });

    if (serie) {
      throw new AppError("Serie title already exists", 409);
    }

    return next();
  };
}

export { SerieMiddleware };
