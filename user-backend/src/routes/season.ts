import { Router } from "express";
import { SeasonController } from "../controllers";
import { Validators, SeasonMiddleware } from "../common/middlewares";

const seasonRouter: Router = Router();

seasonRouter.get(
  "/:id",
  Validators.tokenIsValid,
  SeasonMiddleware.seasonExists,
  SeasonController.getById
);
seasonRouter.get("", Validators.tokenIsValid, SeasonController.getAll);

export { seasonRouter };
