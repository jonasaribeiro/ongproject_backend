import express, { Router } from "express";
import { AvatarController } from "../controllers";
import { AvatarMiddleware, Validators } from "../common/middlewares";
import { SAvatarRequest, SAvatarUpdate } from "../schemas";
import { multerUploadSingleAvatar } from "../config/multer";

const avatarRouter: Router = Router();

avatarRouter.post(
  "",
  multerUploadSingleAvatar,
  express.json(),
  Validators.tokenIsValid,
  Validators.bodyIsValid(SAvatarRequest),
  AvatarController.register
);

avatarRouter.use(express.json());

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
