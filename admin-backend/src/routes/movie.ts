import { Router } from "express";
import { MovieController } from "../controllers";
import { Validators, MovieMiddleware } from "../common/middlewares";
import { SMovieRequest, SMovieUpdate } from "../schemas";
import { multerUploadMovie } from "../config/multer";

const movieRouter: Router = Router();

movieRouter.post(
  "",
  Validators.tokenIsValid,
  multerUploadMovie,
  Validators.bodyIsValid(SMovieRequest),
  MovieController.register
);

movieRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  MovieMiddleware.movieExists,
  Validators.bodyIsValid(SMovieUpdate),
  MovieController.update
);

movieRouter.patch(
  "/:id/active",
  Validators.tokenIsValid,
  MovieMiddleware.movieExists,
  MovieController.toggleActive
);

movieRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  MovieMiddleware.movieExists,
  MovieController.delete
);

export { movieRouter };
