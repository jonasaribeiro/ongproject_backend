import { Router } from "express";
import { AgeRatingController } from "../controllers";
import { AgeRatingMiddleware, Validators } from "../middlewares";
import { SAgeRatingRequest, SAgeRatingUpdate } from "../schemas";

const ageRatingRouter: Router = Router();

ageRatingRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SAgeRatingRequest),
  AgeRatingMiddleware.ageRatingNameExists,
  AgeRatingController.register
);

ageRatingRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  AgeRatingMiddleware.ageRatingExists,
  Validators.bodyIsValid(SAgeRatingUpdate),
  AgeRatingMiddleware.ageRatingNameExists,
  AgeRatingController.update
);

ageRatingRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  AgeRatingMiddleware.ageRatingExists,
  AgeRatingController.delete
);

export { ageRatingRouter };
