import { Request, Response } from "express";
import { SerieService } from "../services/serie";

class SerieController {
  static getAll = async (req: Request, res: Response) => {
    const { category, age } = req.query;

    const categoryId = typeof category === "string" ? category : undefined;
    const ageRatingId = typeof age === "string" ? age : undefined;

    const series = await SerieService.getAll(categoryId, ageRatingId);

    res.status(200).json(series);
  };

  static getById = async (req: Request, res: Response) => {
    const serieId = req.params.id;
    const serie = await SerieService.getById(serieId);

    res.status(200).json(serie);
  };
}

export { SerieController };
