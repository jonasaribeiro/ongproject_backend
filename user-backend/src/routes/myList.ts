import { Router } from "express";
import { RestrictionController } from "../controllers";
import { Validators, MyListMiddleware } from "../common/middlewares";
import { SMyListRequest } from "../schemas";

const myListRouter: Router = Router();

myListRouter.post(
  "",
  Validators.tokenIsValid,
  MyListMiddleware.myListIsProfileValid,
  Validators.bodyIsValid(SMyListRequest),
  RestrictionController.register
);

myListRouter.get(
  "/:profileId",
  Validators.tokenIsValid,
  RestrictionController.getAll
);

myListRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  MyListMiddleware.myListIsProfileValid,
  RestrictionController.delete
);

export { myListRouter };
