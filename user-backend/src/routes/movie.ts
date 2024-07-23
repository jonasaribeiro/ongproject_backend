import { Router } from "express";
import { MovieController } from "../controllers";
import { Validators, MovieMiddleware } from "../common/middlewares";

const movieRouter: Router = Router();

movieRouter.get(
  "/:id",
  Validators.tokenIsValid,
  MovieMiddleware.movieExists,
  MovieController.getById
);
movieRouter.get("", Validators.tokenIsValid, MovieController.getAll);

export { movieRouter };
