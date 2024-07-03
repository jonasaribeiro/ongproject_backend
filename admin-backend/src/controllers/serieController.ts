import { Request, Response } from "express";
import SerieService from "../services/serieService";

class SeriesController {
  static createSerie = async (req: Request, res: Response) => {
    const { title, description, releaseYear, ageRating, categories } = req.body;
    const serieId = await SerieService.createSerieEntity({
      title,
      description,
      releaseYear,
      ageRating: { name: ageRating },
      categories,
    });

    res.status(201).json({ id: serieId });
  };

  static addSeason = async (req: Request, res: Response) => {
    const { serieId } = req.params;
    const { seasonNumber } = req.body;

    const seasonId = await SerieService.addSeason(serieId, {
      seasonNumber: Number(seasonNumber),
    });

    res.status(201).json({ id: seasonId });
  };

  static uploadEpisode = async (req: Request, res: Response) => {
    const { serieId, seasonNumber } = req.params;
    const { episodeNumber, title, description } = req.body;

    const episodeId = await SerieService.createEpisodeEntity(
      serieId,
      Number(seasonNumber),
      {
        episodeNumber: Number(episodeNumber),
        title,
        description,
      }
    );

    const result = await SerieService.uploadEpisodeFiles(
      req,
      res,
      serieId,
      Number(seasonNumber),
      Number(episodeNumber)
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
