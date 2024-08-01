import { Request, Response } from "express";
import { EpisodeService } from "../services/episode";

class EpisodeController {
  static register = async (req: Request, res: Response) => {
    const episode = await EpisodeService.create(req.body);
    res.status(201).json(episode);
  };

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

  static update = async (req: Request, res: Response) => {
    const episodeId = req.params.id;
    const episode = await EpisodeService.update(episodeId, req.body);

    res.status(200).json(episode);
  };

  static delete = async (req: Request, res: Response) => {
    const episodeId = req.params.id;
    await EpisodeService.delete(episodeId);

    res.status(200).json({ message: "Episode deleted with sucess!" });
  };
}

export { EpisodeController };
