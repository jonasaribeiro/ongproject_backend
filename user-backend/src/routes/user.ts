import { Router } from "express";
import { UserController } from "../controllers";
import { Validators, UserMiddleware } from "../common/middlewares";
import { SUserRequest, SUserUpdate } from "../schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  Validators.bodyIsValid(SUserRequest),
  UserMiddleware.emailIsUnique,
  UserMiddleware.phoneIsUnique,
  UserController.register
);

// Rota para criar o perfil do Asaas
userRouter.post(
  "/subscriptionAccount",
  // Validação do body
  // Verificar se já não existe o perfil
  UserController.createAsaasClient
);

userRouter.get(
  "/:id",
  Validators.isUser,
  UserMiddleware.userExists,
  UserController.getById
);

userRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  Validators.isUser,
  UserMiddleware.userExists,
  Validators.bodyIsValid(SUserUpdate),
  UserMiddleware.phoneIsUnique,
  UserController.update
);
userRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  Validators.isUser,
  UserMiddleware.userExists,
  UserController.deactivate
);

export { userRouter };
