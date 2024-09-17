import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { AppError } from "../errors/CustomErrors";

class EpisodeMiddleware {
  static episodeExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const episode = await prisma.episode.findFirst({
      where: {
        id,
      },
    });

    if (!episode) {
      throw new AppError("Episode not found", 404);
    }

    return next();
  };

  static episodeTitleExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { title } = req.body;

    const episode = await prisma.episode.findFirst({
      where: {
        title,
      },
    });

    if (episode) {
      throw new AppError("Episode title already exists", 409);
    }

    return next();
  };
}

export { EpisodeMiddleware };
