import { Request, Response } from "express";
import { AvatarService } from "../services/avatar";

class AvatarController {
  static getAll = async (req: Request, res: Response) => {
    const avatars = await AvatarService.getAll();

    res.status(200).json(avatars);
  };

  static getById = async (req: Request, res: Response) => {
    const avatarId = req.params.id;
    const avatar = await AvatarService.getById(avatarId);

    res.status(200).json(avatar);
  };
}

export { AvatarController };
