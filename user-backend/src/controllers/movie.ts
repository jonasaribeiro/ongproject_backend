import { Request, Response } from "express";
import { MovieService } from "../services/movie";

class MovieController {
  static getAll = async (req: Request, res: Response) => {
    const { category, age } = req.query;

    const categoryId = typeof category === "string" ? category : undefined;
    const ageRatingId = typeof age === "string" ? age : undefined;

    const movies = await MovieService.getAll(categoryId, ageRatingId);

    res.status(200).json(movies);
  };

  static getById = async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const movie = await MovieService.getById(movieId);

    res.status(200).json(movie);
  };

  static getMoviePoster = async (req: Request, res: Response) => {
    const { id } = req.params;
    const imagePath = await MovieService.getMoviePosterPath(id);

    if (!imagePath) {
      res.status(404).json({ error: "Poster not found" });
      return;
    }

    res.sendFile(imagePath);
  };
}

export { MovieController };
