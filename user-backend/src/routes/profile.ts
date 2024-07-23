import { Router } from "express";
import { ProfileController } from "../controllers";
import { Validators, ProfileMiddleware } from "../common/middlewares";
import { SProfileRequest, SProfileUpdate } from "../schemas";

const profileRouter: Router = Router();

profileRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SProfileRequest),
  ProfileMiddleware.profileNameExists,
  ProfileController.register
);

profileRouter.get(
  "/:id",
  Validators.tokenIsValid,
  ProfileMiddleware.profileExists,
  Validators.profileIdParams,
  ProfileController.getById
);
profileRouter.get("", Validators.tokenIsValid, ProfileController.getAll);

profileRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  ProfileMiddleware.profileExists,
  Validators.profileIdParams,
  Validators.bodyIsValid(SProfileUpdate),
  ProfileMiddleware.profileNameExists,
  ProfileController.update
);

profileRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  ProfileMiddleware.profileExists,
  Validators.profileIdParams,
  ProfileController.delete
);

export { profileRouter };
