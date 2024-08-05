import { Request, Response } from "express";
import { MovieService } from "../services/movie";

class MovieController {
  static register = async (req: Request, res: Response) => {
    const movie = await MovieService.create(req.body);

    await MovieService.uploadFiles(req, res, movie.id, "movie");
    return res.status(201).json(movie);
  };

  static toggleActive = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const active = res.locals.active;
    const movie = await MovieService.toggleActive(movieId, active);

    res.status(200).json({ message: "Changed movie active status." });
  };

  static update = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const movie = await MovieService.update(movieId, req.body);

    res.status(200).json(movie);
  };

  static delete = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    await MovieService.delete(movieId);

    res.status(200).json({ message: "Movie deleted with sucess!" });
  };
}

export { MovieController };
