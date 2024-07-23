import { Router } from "express";
import { WatchingMovieController } from "../controllers";
import { Validators, WatchingMovieMiddleware } from "../common/middlewares";
import { SWatchingMovieRequest } from "../schemas";

const watchingMovieRouter: Router = Router();

watchingMovieRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.profileIdBody,
  Validators.bodyIsValid(SWatchingMovieRequest),
  WatchingMovieController.register
);

watchingMovieRouter.get(
  "/:profileId",
  Validators.tokenIsValid,
  Validators.profileIdParams,
  WatchingMovieController.getAll
);

watchingMovieRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  WatchingMovieMiddleware.watchingMovieIsProfileValid,
  WatchingMovieController.delete
);

export { watchingMovieRouter };
