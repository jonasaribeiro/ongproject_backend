import { Router } from "express";
import { AgeRatingController } from "../controllers";
import { Validators } from "../common/middlewares";

const ageRatingRouter: Router = Router();

ageRatingRouter.get(
  "/:id",
  Validators.tokenIsValid,
  AgeRatingController.getById
);

ageRatingRouter.get("", Validators.tokenIsValid, AgeRatingController.getAll);

export { ageRatingRouter };
