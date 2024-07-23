import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class UserMiddleware {
  static emailIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;

    if (email) {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        throw new AppError("Email already exists", 409);
      }
    }

    return next();
  };

  static phoneIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { phone } = req.body;

    if (phone) {
      const user = await prisma.user.findFirst({
        where: {
          phone,
        },
      });

      if (user?.id !== res.locals.userId) {
        throw new AppError("Phone already exists", 409);
      }
    }

    return next();
  };

  static userExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return next();
  };
}

export { UserMiddleware };
