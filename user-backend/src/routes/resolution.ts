import { Router } from "express";
import { ResolutionController } from "../controllers";
import { Validators } from "../common/middlewares";

const resolutionRouter: Router = Router();

resolutionRouter.get(
  "/:id",
  Validators.tokenIsValid,
  ResolutionController.getById
);

resolutionRouter.get("", Validators.tokenIsValid, ResolutionController.getAll);

export { resolutionRouter };
