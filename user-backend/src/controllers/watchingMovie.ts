import { Request, Response } from "express";
import { WatchingMovieService } from "../services/watchingMovie";

class WatchingMovieController {
  static register = async (req: Request, res: Response) => {
    const watchingMovie = await WatchingMovieService.create(req.body);
    res.status(201).json(watchingMovie);
  };

  static getAll = async (req: Request, res: Response) => {
    const profileId = req.params.profileId;
    const watchingMovies = await WatchingMovieService.getAll(profileId);

    res.status(200).json(watchingMovies);
  };

  static delete = async (req: Request, res: Response) => {
    const watchingMovieId = req.params.id;
    await WatchingMovieService.delete(watchingMovieId);

    res.status(200).json({ message: "Watching content finished with sucess" });
  };
}

export { WatchingMovieController };
