import { Router } from "express";
import { SeasonController } from "../controllers";
import { Validators, SeasonMiddleware } from "../common/middlewares";
import { SSeasonRequest, SSeasonUpdate } from "../schemas";

const seasonRouter: Router = Router();

seasonRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SSeasonRequest),
  SeasonMiddleware.seasonTitleExists,
  SeasonController.register
);

seasonRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  SeasonMiddleware.seasonExists,
  Validators.bodyIsValid(SSeasonUpdate),
  SeasonMiddleware.seasonTitleExists,
  SeasonController.update
);

seasonRouter.patch(
  "/:id/active",
  Validators.tokenIsValid,
  SeasonMiddleware.seasonExists,
  SeasonController.toggleActive
);

seasonRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  SeasonMiddleware.seasonExists,
  SeasonController.delete
);

export { seasonRouter };
