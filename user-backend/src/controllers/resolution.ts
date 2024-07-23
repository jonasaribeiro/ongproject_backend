import { Request, Response } from "express";
import { ResolutionService } from "../services/resolution";

class ResolutionController {
  static getAll = async (req: Request, res: Response) => {
    const resolutions = await ResolutionService.getAll();

    res.status(200).json(resolutions);
  };

  static getById = async (req: Request, res: Response) => {
    const resolutionId = req.params.id;
    const resolution = await ResolutionService.getById(resolutionId);

    res.status(200).json(resolution);
  };
}

export { ResolutionController };
