import { Request, Response } from "express";
import { EpisodeService } from "../services/episode";

class EpisodeController {
  static register = async (req: Request, res: Response) => {
    const episode = await EpisodeService.create(req.body);
    await EpisodeService.uploadEpisodeFiles(
      req,
      res,
      episode.season.serieId,
      episode.season.seasonNumber,
      episode.episodeNumber
    );

    return res.status(201).json(episode);
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
