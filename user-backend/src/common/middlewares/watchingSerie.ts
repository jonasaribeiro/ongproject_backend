import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class WatchingSerieMiddleware {
  static watchingSerieIsProfileValid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profileId = res.locals.profileId;
    const watchingSerieId = req.params.id;

    const watchingSerie = await prisma.watchingSerie.findUniqueOrThrow({
      where: { id: watchingSerieId },
    });

    if (watchingSerie.profileId != profileId) {
      throw new AppError(
        "You are trying to delete data from a profile that is not yours",
        403
      );
    }

    return next();
  };
}

export { WatchingSerieMiddleware };
