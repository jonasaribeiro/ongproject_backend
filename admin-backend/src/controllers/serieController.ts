import { Request, Response } from "express";

class SeriesController {
  static upload = async (req: Request, res: Response) => {
    res.status(201).json();
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

export default SeriesController;
