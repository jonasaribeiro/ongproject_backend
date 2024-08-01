import { Request, Response } from "express";
import { ResolutionService } from "../services/resolution";

class ResolutionController {
  static register = async (req: Request, res: Response) => {
    const resolution = await ResolutionService.create(req.body);
    res.status(201).json(resolution);
  };

  static getAll = async (req: Request, res: Response) => {
    const resolutions = await ResolutionService.getAll();

    res.status(200).json(resolutions);
  };

  static getById = async (req: Request, res: Response) => {
    const resolutionId = req.params.id;
    const resolution = await ResolutionService.getById(resolutionId);

    res.status(200).json(resolution);
  };

  static update = async (req: Request, res: Response) => {
    const resolutionId = req.params.id;
    const resolution = await ResolutionService.update(resolutionId, req.body);

    res.status(200).json(resolution);
  };

  static delete = async (req: Request, res: Response) => {
    const resolutionId = req.params.id;
    await ResolutionService.delete(resolutionId);

    res.status(200).json({ message: "Resolution deleted with sucess" });
  };
}

export { ResolutionController };
