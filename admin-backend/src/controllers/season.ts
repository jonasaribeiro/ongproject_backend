import { Request, Response } from "express";
import { SeasonService } from "../services/season";

class SeasonController {
  static register = async (req: Request, res: Response) => {
    const season = await SeasonService.create(req.body);
    res.status(201).json(season);
  };

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
