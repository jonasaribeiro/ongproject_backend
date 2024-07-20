import { Router } from "express";
import { AvatarController } from "../controllers";
import { Validators } from "../common/middlewares";

const avatarRouter: Router = Router();

avatarRouter.get("/:id", Validators.tokenIsValid, AvatarController.getById);
avatarRouter.get("", Validators.tokenIsValid, AvatarController.getAll);

export { avatarRouter };
