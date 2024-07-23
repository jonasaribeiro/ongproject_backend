import { Router } from "express";
import { RestrictionController } from "../controllers";
import { Validators } from "../common/middlewares";
import { SRestrictionsRequest } from "../schemas";

const restrictionRouter: Router = Router();

restrictionRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.profileIdBody,
  Validators.bodyIsValid(SRestrictionsRequest),
  RestrictionController.register
);

restrictionRouter.get(
  "/:profileId",
  Validators.tokenIsValid,
  RestrictionController.getAll
);

restrictionRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  Validators.profileIdBody,
  RestrictionController.delete
);

export { restrictionRouter };
