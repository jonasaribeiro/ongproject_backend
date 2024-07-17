import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class MyListMiddleware {
  static myListIsProfileValid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdToken: string = res.locals.userId;
    const { profileId } = req.body;

    const profile = await prisma.profile.findUniqueOrThrow({
      where: { id: profileId },
    });

    if (profile.userId != userIdToken) {
      throw new AppError(
        "You are trying to create data from a profile that is not yours",
        403
      );
    }
    res.locals.profileId = profile.id;
    return next();
  };

  static myListUserValid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdToken: string = res.locals.userId;
    const myListId = req.params.id;

    const myList = await prisma.myList.findUniqueOrThrow({
      where: { id: myListId },
      select: { profile: true },
    });

    if (myList.profile.userId != userIdToken) {
      throw new AppError(
        "You are trying to delete data from a profile that is not yours",
        403
      );
    }

    res.locals.profileId = myList.profile.id;
    return next();
  };
}

export { MyListMiddleware };
