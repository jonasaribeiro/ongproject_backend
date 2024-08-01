import { Router } from "express";
import { AvatarController } from "../controllers";
import { AvatarMiddleware, Validators } from "../common/middlewares";
import { SAvatarRequest, SAvatarUpdate } from "../schemas";

const avatarRouter: Router = Router();

avatarRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SAvatarRequest),
  AvatarController.register
);

avatarRouter.get("/:id", Validators.tokenIsValid, AvatarController.getById);
avatarRouter.get("", Validators.tokenIsValid, AvatarController.getAll);

avatarRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  AvatarMiddleware.avatarExists,
  Validators.bodyIsValid(SAvatarUpdate),
  AvatarController.update
);
avatarRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  AvatarMiddleware.avatarExists,
  AvatarController.delete
);

export { avatarRouter };
