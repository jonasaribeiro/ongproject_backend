import { Request, Response } from "express";
import SerieService from "../services/serieService";

class SeriesController {
  static createSerie = async (req: Request, res: Response) => {
    const { title, description, release, ageRating, categories } = req.body;
    const serieId = await SerieService.createSerieEntity({
      title,
      description,
      release,
      ageRating: { name: ageRating },
      categories,
    });

    res.status(201).json({ id: serieId });
  };

  static addSeason = async (req: Request, res: Response) => {
    const { serieId } = req.params;
    const data = req.body;

    const seasonId = await SerieService.addSeason(data);

    res.status(201).json({ id: seasonId });
  };

  static uploadEpisode = async (req: Request, res: Response) => {
    const { serieId, seasonNumber } = req.params;
    const data = req.body;

    const episode = await SerieService.createEpisodeEntity(data);

    const result = await SerieService.uploadEpisodeFiles(
      req,
      res,
      serieId,
      Number(seasonNumber),
      episode.episodeNumber
    );
    res.status(201).json(result);
  };

  static activateSerie = async (req: Request, res: Response) => {
    const { serieId } = req.params;

    await SerieService.activateSerie(serieId);
    res.status(200).json({ message: "Serie activated successfully" });
  };

  static activateSeason = async (req: Request, res: Response) => {
    const { serieId, seasonNumber } = req.params;

    await SerieService.activateSeason(serieId, Number(seasonNumber));
    res.status(200).json({ message: "Season activated successfully" });
  };
}

export default SeriesController;
