import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import { AppError } from "../../errors/CustomErrors";

class CardMiddleware {
  static cardExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const card = await prisma.card.findFirst({
      where: {
        id,
      },
    });

    if (!card) {
      throw new AppError("Card not found", 404);
    }

    return next();
  };

  static isOwner = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;
    const { id } = req.params;

    const card = await prisma.card.findFirst({
      where: {
        id,
      },
    });

    if (card?.userId !== userId) {
      throw new AppError("You don't have permission to do this.", 403);
    }
    return next();
  };
}

export { CardMiddleware };
