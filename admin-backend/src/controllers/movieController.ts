import { Request, Response } from "express";
import MovieService from "../services/movieService";

class MoviesController {
  static upload = async (req: Request, res: Response) => {
    const movieId = await MovieService.createMovieEntity(req.body);
    const result = await MovieService.uploadFiles(req, res, movieId);
    res.status(201).json(result);
  };

  static getAll = async (req: Request, res: Response) => {
    res.status(200).json();
  };

  static getDetail = async (req: Request, res: Response) => {
    res.status(200).json();
  };

  static update = async (req: Request, res: Response) => {
    res.status(200).json();
  };

  static delete = async (req: Request, res: Response) => {
    res.status(204).send();
  };
}

export default MoviesController;
