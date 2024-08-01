import { Request, Response } from "express";
import { AvatarService } from "../services/avatar";

class AvatarController {
  static register = async (req: Request, res: Response) => {
    const avatar = await AvatarService.create(req.body);
    res.status(201).json(avatar);
  };

  static getAll = async (req: Request, res: Response) => {
    const avatars = await AvatarService.getAll();

    res.status(200).json(avatars);
  };

  static getById = async (req: Request, res: Response) => {
    const avatarId = req.params.id;
    const avatar = await AvatarService.getById(avatarId);

    res.status(200).json(avatar);
  };

  static update = async (req: Request, res: Response) => {
    const avatarId = req.params.id;
    const avatar = await AvatarService.update(avatarId, req.body);

    res.status(200).json(avatar);
  };

  static delete = async (req: Request, res: Response) => {
    const avatarId = req.params.id;
    await AvatarService.delete(avatarId);

    res.status(200).json({ message: "Avatar deleted with sucess" });
  };
}

export { AvatarController };
