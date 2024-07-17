import { Request, Response } from "express";
import { SerieService } from "../services/serie";

class SerieController {
  static getAll = async (req: Request, res: Response) => {
    const series = await SerieService.getAll();

    res.status(200).json(series);
  };

  static getById = async (req: Request, res: Response) => {
    const serieId = req.params.id;
    const serie = await SerieService.getById(serieId);

    res.status(200).json(serie);
  };
}

export { SerieController };
