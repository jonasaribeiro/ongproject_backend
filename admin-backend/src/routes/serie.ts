import { Router } from "express";
import { SerieController } from "../controllers";
import { Validators, SerieMiddleware } from "../common/middlewares";
import { SSerieRequest, SSerieUpdate } from "../schemas";
import { multerUploadSinglePoster } from "../config/multer";

const serieRouter: Router = Router();

serieRouter.post(
  "",
  multerUploadSinglePoster,
  Validators.tokenIsValid,
  Validators.bodyIsValid(SSerieRequest),
  SerieMiddleware.serieTitleExists,
  SerieController.register
);

serieRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  Validators.bodyIsValid(SSerieUpdate),
  SerieMiddleware.serieTitleExists,
  SerieController.update
);

serieRouter.patch(
  "/:id/active",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  SerieController.toggleActive
);

serieRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  SerieMiddleware.serieExists,
  SerieController.delete
);

export { serieRouter };
