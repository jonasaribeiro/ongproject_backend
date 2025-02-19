import { Router } from "express";
import { SerieController } from "../controllers";
import { Validators, SerieMiddleware } from "../common/middlewares";

const serieRouter: Router = Router();

serieRouter.get(
  "/:id",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  SerieController.getById
);

serieRouter.get(
  "/:id/poster",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  SerieController.getSeriePoster
);

serieRouter.get("", Validators.tokenIsValid, SerieController.getAll);

export { serieRouter };
