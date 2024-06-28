import { Request, Response } from "express";
import MovieService from "../services/moviesService";

class MoviesController {
  static async getMovies(req: Request, res: Response) {
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMovies(Number(page), Number(pageSize));
    res.json(movies);
  }

  static async getMoviesByGenre(req: Request, res: Response) {
    const { genre } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMoviesByGenre(
      genre,
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

  static async getMoviesByGenreAndAgeRating(req: Request, res: Response) {
    const { genre, ageRating } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const movies = await MovieService.getMoviesByGenreAndAgeRating(
      genre,
      ageRating,
      Number(page),
      Number(pageSize)
    );
    res.json(movies);
  }
}

export default MoviesController;
