import { Request, Response } from "express";
import { SerieService } from "../services/serie";

class SerieController {
  static register = async (req: Request, res: Response) => {
    const serie = await SerieService.create(req.body);
    res.status(201).json(serie);
  };

  static update = async (req: Request, res: Response) => {
    const serieId = req.params.id;
    const serie = await SerieService.update(serieId, req.body);

    res.status(200).json(serie);
  };

  static delete = async (req: Request, res: Response) => {
    const serieId = req.params.id;
    await SerieService.delete(serieId);

    res.status(200).json({ message: "Serie deleted with sucess!" });
  };
}

export { SerieController };
