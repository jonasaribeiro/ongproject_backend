import { Router } from "express";
import { CardController } from "../controllers";
import { Validators, CardMiddleware } from "../common/middlewares";
import { SCardRequest, SCardUpdate } from "../schemas";

const cardRouter: Router = Router();

cardRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SCardRequest),
  CardController.register
);

cardRouter.get(
  "/:id",
  Validators.tokenIsValid,
  CardMiddleware.cardExists,
  CardMiddleware.isOwner,
  CardController.getById
);
cardRouter.get("", Validators.tokenIsValid, CardController.getAll);

cardRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  CardMiddleware.cardExists,
  CardMiddleware.isOwner,
  Validators.bodyIsValid(SCardUpdate),
  CardController.update
);
cardRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  CardMiddleware.cardExists,
  CardMiddleware.isOwner,
  CardController.delete
);

export { cardRouter };
