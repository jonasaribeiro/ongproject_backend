import { Request, Response } from "express";
import { SeasonService } from "../services/season";

class SeasonController {
  static getAll = async (req: Request, res: Response) => {
    const serieId = req.params.serieId;

    const seasons = await SeasonService.getAll(serieId);

    res.status(200).json(seasons);
  };

  static getById = async (req: Request, res: Response) => {
    const seasonId = req.params.id;
    const season = await SeasonService.getById(seasonId);

    res.status(200).json(season);
  };
}

export { SeasonController };
