import { Router } from "express";
import { SerieController } from "../controllers";
import { Validators, SerieMiddleware } from "../common/middlewares";
import { SSerieRequest, SSerieUpdate } from "../schemas";

const serieRouter: Router = Router();

serieRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SSerieRequest),
  SerieMiddleware.serieTitleExists,
  SerieController.register
);

serieRouter.get(
  "/:id",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  SerieController.getById
);
serieRouter.get("", Validators.tokenIsValid, SerieController.getAll);

serieRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  Validators.bodyIsValid(SSerieUpdate),
  SerieMiddleware.serieTitleExists,
  SerieController.update
);
serieRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  SerieController.delete
);

export { serieRouter };
