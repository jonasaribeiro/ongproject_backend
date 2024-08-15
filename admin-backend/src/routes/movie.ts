import express, { Router } from "express";
import { MovieController } from "../controllers";
import { Validators, MovieMiddleware } from "../common/middlewares";
import { SMovieRequest, SMovieUpdate } from "../schemas";
import { multerUploadMovie } from "../config/multer";

const movieRouter: Router = Router();

movieRouter.post(
  "",
  multerUploadMovie,
  express.json(),
  Validators.tokenIsValid,
  Validators.bodyIsValid(SMovieRequest),
  MovieController.register
);

movieRouter.use(express.json());

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
