import { Router } from "express";
import { ResolutionController } from "../controllers";
import { ResolutionMiddleware, Validators } from "../common/middlewares";
import { SResolutionRequest, SResolutionUpdate } from "../schemas";

const resolutionRouter: Router = Router();

resolutionRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SResolutionRequest),
  ResolutionMiddleware.resolutionNameExists,
  ResolutionController.register
);

resolutionRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  ResolutionMiddleware.resolutionExists,
  Validators.bodyIsValid(SResolutionUpdate),
  ResolutionMiddleware.resolutionNameExists,
  ResolutionController.update
);

resolutionRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  ResolutionMiddleware.resolutionExists,
  ResolutionController.delete
);

export { resolutionRouter };
