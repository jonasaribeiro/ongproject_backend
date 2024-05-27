import { Request, Response } from "express";
import MovieService from "../services/movieService";

class MoviesController {
  static upload = async (req: Request, res: Response) => {
    console.log("MoviesController - Iniciou");
    const result = await MovieService.upload(req, res);
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
