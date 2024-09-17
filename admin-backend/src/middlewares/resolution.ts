import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { AppError } from "../errors/CustomErrors";

class ResolutionMiddleware {
  static resolutionExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const resolution = await prisma.resolution.findFirst({
      where: {
        id,
      },
    });

    if (!resolution) {
      throw new AppError("Resolution not found", 404);
    }

    return next();
  };

  static resolutionNameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;

    const resolution = await prisma.resolution.findFirst({
      where: {
        name,
      },
    });

    if (resolution) {
      throw new AppError("Resolution already exists", 409);
    }

    return next();
  };
}

export { ResolutionMiddleware };
