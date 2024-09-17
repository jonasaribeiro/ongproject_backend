import express, { Router } from "express";
import { EpisodeController } from "../controllers";
import { Validators, EpisodeMiddleware } from "../middlewares";
import { SEpisodeRequest, SEpisodeUpdate } from "../schemas";
import { multerUploadSingleEpisode } from "../config/multer";

const episodeRouter: Router = Router();

episodeRouter.post(
  "",
  multerUploadSingleEpisode,
  express.json(),
  Validators.tokenIsValid,
  Validators.bodyIsValid(SEpisodeRequest),
  EpisodeMiddleware.episodeTitleExists,
  EpisodeController.register
);

episodeRouter.use(express.json());

episodeRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  EpisodeMiddleware.episodeExists,
  Validators.bodyIsValid(SEpisodeUpdate),
  EpisodeMiddleware.episodeTitleExists,
  EpisodeController.update
);

episodeRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  EpisodeMiddleware.episodeExists,
  EpisodeController.delete
);

export { episodeRouter };
