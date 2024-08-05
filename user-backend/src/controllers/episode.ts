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

  static getEpisodePoster = async (req: Request, res: Response) => {
    const { serieId } = req.params;
    const { seasonNumber, episodeNumber } = res.locals;
    const imagePath = await EpisodeService.getEpisodePosterPath(
      serieId,
      seasonNumber,
      episodeNumber
    );

    if (!imagePath) {
      res.status(404).json({ error: "Poster not found" });
      return;
    }

    res.sendFile(imagePath);
  };
}

export { EpisodeController };
