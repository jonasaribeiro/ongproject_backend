import { Request, Response } from "express";
import { ProfileService } from "../services/profile";

class ProfileController {
  static register = async (req: Request, res: Response) => {
    const profile = await ProfileService.create(req.body);
    res.status(201).json(profile);
  };

  static getAll = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const profiles = await ProfileService.getAll(userId);
    res.status(200).json(profiles);
  };

  static getById = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const profile = await ProfileService.getById(profileId);

    res.status(200).json(profile);
  };

  static update = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const profile = await ProfileService.update(profileId, req.body);

    res.status(200).json(profile);
  };

  static delete = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    await ProfileService.delete(profileId);

    res.status(200).json({ message: "Profile deleted with sucess" });
  };
}

export { ProfileController };
