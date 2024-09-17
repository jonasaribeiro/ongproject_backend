import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { AppError } from "../errors/CustomErrors";

class MovieMiddleware {
  static movieExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const movie = await prisma.movie.findFirst({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    res.locals.active = movie.active;

    return next();
  };

  static movieTitleExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { title } = req.body;

    const movie = await prisma.movie.findFirst({
      where: {
        title,
      },
    });

    if (movie) {
      throw new AppError("Movie title already exists", 409);
    }

    return next();
  };
}

export { MovieMiddleware };
