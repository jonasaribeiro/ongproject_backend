import { Request, Response } from "express";
import { EpisodeService } from "../services/episode";

class EpisodeController {
  static getAll = async (req: Request, res: Response) => {
    const seasonId = req.params.seasonId;

    const episodes = await EpisodeService.getAll(seasonId);

    res.status(200).json(episodes);
  };

  static getById = async (req: Request, res: Response) => {
    const episodeId = req.params.id;
    const episode = await EpisodeService.getById(episodeId);

    res.status(200).json(episode);
  };
}

export { EpisodeController };
