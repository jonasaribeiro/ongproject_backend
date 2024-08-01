import { Request, Response } from "express";
import { SeasonService } from "../services/season";
import prisma from "../config/prisma";

class SeasonController {
  static register = async (req: Request, res: Response) => {
    const season = await SeasonService.create(req.body);
    res.status(201).json(season);
  };

  static toggleActive = async (
    seasonId: string,
    activeStatus: boolean
  ): Promise<void> => {
    await prisma.season.update({
      where: { id: seasonId },
      data: { active: !activeStatus },
    });
  };

  static update = async (req: Request, res: Response) => {
    const seasonId = req.params.id;
    const season = await SeasonService.update(seasonId, req.body);

    res.status(200).json(season);
  };

  static delete = async (req: Request, res: Response) => {
    const seasonId = req.params.id;
    await SeasonService.delete(seasonId);

    res.status(200).json({ message: "Season deleted with sucess!" });
  };
}

export { SeasonController };
