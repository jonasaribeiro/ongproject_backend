import { Router } from "express";
import { Validators } from "../common/middlewares";
import { SLoginRequest } from "../schemas";
import { LoginController } from "../controllers";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  Validators.bodyIsValid(SLoginRequest),
  LoginController.loginUser
);

export { loginRouter };
