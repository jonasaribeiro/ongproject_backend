import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { AppError } from "../errors/CustomErrors";

class AvatarMiddleware {
  static avatarExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const avatar = await prisma.avatar.findFirst({
      where: {
        id,
      },
    });

    if (!avatar) {
      throw new AppError("Avatar not found", 404);
    }

    return next();
  };
}

export { AvatarMiddleware };
