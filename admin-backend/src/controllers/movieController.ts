import { Request, Response } from "express";
import MovieService from "../services/movieService";

class MoviesController {
  static upload = async (req: Request, res: Response) => {
    const { title, description, pubYear, ageRating, genres } = req.body;

    // Garantir que genres seja sempre um array
    const genreArray = Array.isArray(genres)
      ? genres.map((name) => ({ name }))
      : [{ name: genres }];
    const ageRatingObj = { description: ageRating };

    const movieId = await MovieService.createMovieEntity({
      title,
      description,
      pubYear,
      ageRating: ageRatingObj,
      genres: genreArray,
    });

    const result = await MovieService.uploadFiles(req, res, movieId);
    res.status(201).json(result);
  };
}

export default MoviesController;
