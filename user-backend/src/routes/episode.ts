import { Router } from "express";
import { EpisodeController } from "../controllers";
import { Validators, EpisodeMiddleware } from "../common/middlewares";

const episodeRouter: Router = Router();

episodeRouter.get(
  "/:id",
  Validators.tokenIsValid,
  EpisodeMiddleware.episodeExists,
  EpisodeController.getById
);

episodeRouter.get(
  "/:id/poster",
  Validators.tokenIsValid,
  EpisodeMiddleware.episodeExists,
  EpisodeController.getEpisodePoster
);

episodeRouter.get("", Validators.tokenIsValid, EpisodeController.getAll);

export { episodeRouter };
