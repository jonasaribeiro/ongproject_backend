import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { AppError } from "../errors/CustomErrors";

class CategoryMiddleware {
  static categoryExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return next();
  };

  static categoryNameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;

    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (category) {
      throw new AppError("Category already exists", 409);
    }

    return next();
  };
}

export { CategoryMiddleware };
