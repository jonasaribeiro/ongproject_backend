import { Request, Response } from "express";
import { RestrictionService } from "../services/restriction";

class RestrictionController {
  static register = async (req: Request, res: Response) => {
    const restriction = await RestrictionService.create(req.body);
    res.status(201).json(restriction);
  };

  static getAll = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const restrictions = await RestrictionService.getAll(profileId);

    res.status(200).json(restrictions);
  };

  static delete = async (req: Request, res: Response) => {
    const restrictionId = req.params.id;
    await RestrictionService.delete(restrictionId);

    res.status(200).json({ message: "Restriction deleted with sucess" });
  };
}

export { RestrictionController };
