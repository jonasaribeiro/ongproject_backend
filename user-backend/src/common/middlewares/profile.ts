import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class ProfileMiddleware {
  static profileExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const profile = await prisma.profile.findFirst({
      where: {
        id,
      },
    });

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    return next();
  };

  static profileNameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const userIdToken: string = res.locals.userId;

    const profiles = await prisma.profile.findMany({
      where: {
        userId: userIdToken,
      },
    });

    const names = profiles.map(profile => profile.name);

    if (names.findIndex(name) !== -1) {
      throw new AppError("Profile already exists", 409);
    }

    return next();
  };
}

export { ProfileMiddleware };
