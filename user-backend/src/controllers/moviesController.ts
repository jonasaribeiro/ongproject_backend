import { Request, Response } from "express";
import MovieService from "../services/moviesService";

class MoviesController {
  /*
  static async getMovies(req: Request, res: Response) {
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMovies(Number(page), Number(pageSize));
    res.json(movies);
  }

  static async getMoviesByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMoviesByCategory(
      category,
      Number(page),
      Number(pageSize)
    );
    res.json(movies);
  }

  static async getMoviesByAgeRating(req: Request, res: Response) {
    const { ageRating } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMoviesByAgeRating(
      ageRating,
      Number(page),
      Number(pageSize)
    );
    res.json(movies);
  }

  static async getMoviesByCategoryAndAgeRating(req: Request, res: Response) {
    const { category, ageRating } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMoviesByCategoryAndAgeRating(
      category,
      ageRating,
      Number(page),
      Number(pageSize)
    );
    res.json(movies);
  }
   */

  static async getMoviePoster(req: Request, res: Response) {
    const { id } = req.params;
    const imagePath = await MovieService.getMoviePosterPath(id);

    if (!imagePath) {
      res.status(404).json({ error: "Poster not found" });
      return;
    }

    res.sendFile(imagePath);
  }
}

export { MoviesController };
