import { Request, Response } from "express";
import { MovieService } from "../services/movie";

class MovieController {
  static getAll = async (req: Request, res: Response) => {
    const movies = await MovieService.getAll();

    res.status(200).json(movies);
  };

  static getById = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const movie = await MovieService.getById(movieId);

    res.status(200).json(movie);
  };
}

export { MovieController };
