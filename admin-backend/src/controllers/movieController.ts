import { Request, Response } from "express";
import MovieService from "../services/movieService";

class MovieController {
  static upload = async (req: Request, res: Response) => {
    const { title, description, release, ageRating, categories } = req.body;
    const movieId = await MovieService.createMovieEntity({
      title,
      description,
      release,
      ageRating: { name: ageRating },
      categories,
    });

    const result = await MovieService.uploadFiles(req, res, movieId);
    res.status(201).json(result);
  };

  static activateMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    await MovieService.activateMovie(movieId);
    res.status(200).json({ message: "Movie activated successfully" });
  };
}

export default MovieController;
