import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class WatchingMovieMiddleware {
  static watchingMovieIsProfileValid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profileId = res.locals.profileId;
    const watchingMovieId = req.params.id;

    const watchingMovie = await prisma.watchingMovie.findUniqueOrThrow({
      where: { id: watchingMovieId },
    });

    if (watchingMovie.profileId != profileId) {
      throw new AppError(
        "You are trying to delete data from a profile that is not yours",
        403
      );
    }

    return next();
  };
}

export { WatchingMovieMiddleware };
