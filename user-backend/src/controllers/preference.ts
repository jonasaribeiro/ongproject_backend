import { Request, Response } from "express";
import { PreferenceService } from "../services/preference";

class PreferenceController {
  static register = async (req: Request, res: Response) => {
    const preference = await PreferenceService.create(req.body);
    res.status(201).json(preference);
  };

  static getAll = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const restrictions = await PreferenceService.getAll(profileId);

    res.status(200).json(restrictions);
  };

  static delete = async (req: Request, res: Response) => {
    const preferenceId = req.params.id;
    await PreferenceService.delete(preferenceId);

    res.status(200).json({ message: "Restriction deleted with sucess" });
  };
}

export { PreferenceController };
