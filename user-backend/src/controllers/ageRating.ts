import { Request, Response } from "express";
import { AgeRatingService } from "../services/ageRating";

class AgeRatingController {
  static getAll = async (req: Request, res: Response) => {
    const ageRatings = await AgeRatingService.getAll();

    res.status(200).json(ageRatings);
  };

  static getById = async (req: Request, res: Response) => {
    const ageRatingId = req.params.id;
    const ageRating = await AgeRatingService.getById(ageRatingId);

    res.status(200).json(ageRating);
  };
}

export { AgeRatingController };
