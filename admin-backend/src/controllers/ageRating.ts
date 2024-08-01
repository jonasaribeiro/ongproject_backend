import { Request, Response } from "express";
import { AgeRatingService } from "../services/ageRating";

class AgeRatingController {
  static register = async (req: Request, res: Response) => {
    const ageRating = await AgeRatingService.create(req.body);
    res.status(201).json(ageRating);
  };

  static getAll = async (req: Request, res: Response) => {
    const ageRatings = await AgeRatingService.getAll();

    res.status(200).json(ageRatings);
  };

  static getById = async (req: Request, res: Response) => {
    const ageRatingId = req.params.id;
    const ageRating = await AgeRatingService.getById(ageRatingId);

    res.status(200).json(ageRating);
  };

  static update = async (req: Request, res: Response) => {
    const ageRatingId = req.params.id;
    const ageRating = await AgeRatingService.update(ageRatingId, req.body);

    res.status(200).json(ageRating);
  };

  static delete = async (req: Request, res: Response) => {
    const ageRatingId = req.params.id;
    await AgeRatingService.delete(ageRatingId);

    res.status(200).json({ message: "Age rating deleted with sucess" });
  };
}

export { AgeRatingController };
