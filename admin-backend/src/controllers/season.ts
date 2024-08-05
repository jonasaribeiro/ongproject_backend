import { Request, Response } from "express";
import { SeasonService } from "../services/season";
import prisma from "../config/prisma";

class SeasonController {
  static register = async (req: Request, res: Response) => {
    const season = await SeasonService.create(req.body);
    res.status(201).json(season);
  };

  static toggleActive = async (req: Request, res: Response) => {
    const seasonId = req.params.id;
    const active = res.locals.active;
    await SeasonService.toggleActive(seasonId, active);

    res.status(200).json({ message: "Changed season active status." });
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
