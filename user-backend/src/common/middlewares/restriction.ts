import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class RestrictionMiddleware {
  static restrictionUserValid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdToken: string = res.locals.userId;
    const restrictionId = req.params.id;

    const restriction = await prisma.restrictions.findUniqueOrThrow({
      where: { id: restrictionId },
      select: { profile: true },
    });

    if (restriction.profile.userId != userIdToken) {
      throw new AppError(
        "You are trying to delete data from a profile that is not yours",
        403
      );
    }
    res.locals.profileId = restriction.profile.id;
    return next();
  };
}

export { RestrictionMiddleware };
