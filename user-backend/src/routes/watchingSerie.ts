import { Router } from "express";
import { WatchingMovieController } from "../controllers";
import { Validators, WatchingSerieMiddleware } from "../common/middlewares";
import { SWatchingSerieRequest } from "../schemas";

const watchingSerieRouter: Router = Router();

watchingSerieRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.profileIdBody,
  Validators.bodyIsValid(SWatchingSerieRequest),
  WatchingMovieController.register
);

watchingSerieRouter.get(
  "/:profileId",
  Validators.tokenIsValid,
  WatchingMovieController.getAll
);

watchingSerieRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  WatchingSerieMiddleware.watchingSerieIsProfileValid,
  WatchingMovieController.delete
);

export { watchingSerieRouter };
