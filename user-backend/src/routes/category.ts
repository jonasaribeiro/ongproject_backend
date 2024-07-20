import { Router } from "express";
import { CategoryController } from "../controllers";
import { Validators } from "../common/middlewares";

const categoryRouter: Router = Router();

categoryRouter.get("/:id", Validators.tokenIsValid, CategoryController.getById);

categoryRouter.get("", Validators.tokenIsValid, CategoryController.getAll);

export { categoryRouter };
