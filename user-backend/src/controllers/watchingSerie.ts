import { Request, Response } from "express";
import { WatchingSerieService } from "../services/watchingSerie";

class WatchingSerieController {
  static register = async (req: Request, res: Response) => {
    const watchingSerie = await WatchingSerieService.create(req.body);
    res.status(201).json(watchingSerie);
  };

  static getAll = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const watchingSeries = await WatchingSerieService.getAll(profileId);

    res.status(200).json(watchingSeries);
  };

  static delete = async (req: Request, res: Response) => {
    const watchingSerieId = req.params.id;
    await WatchingSerieService.delete(watchingSerieId);

    res.status(200).json({ message: "Watching content finished with sucess" });
  };
}

export { WatchingSerieController };
