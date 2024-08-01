import { Router } from "express";
import { CategoryController } from "../controllers";
import { CategoryMiddleware, Validators } from "../common/middlewares";
import { SCategoryRequest, SCategoryUpdate } from "../schemas";

const categoryRouter: Router = Router();

categoryRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.bodyIsValid(SCategoryRequest),
  CategoryMiddleware.categoryNameExists,
  CategoryController.register
);

categoryRouter.get("/:id", Validators.tokenIsValid, CategoryController.getById);

categoryRouter.get("", Validators.tokenIsValid, CategoryController.getAll);

categoryRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  CategoryMiddleware.categoryExists,
  Validators.bodyIsValid(SCategoryUpdate),
  CategoryMiddleware.categoryNameExists,
  CategoryController.update
);

categoryRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  CategoryMiddleware.categoryExists,
  CategoryController.delete
);

export { categoryRouter };
