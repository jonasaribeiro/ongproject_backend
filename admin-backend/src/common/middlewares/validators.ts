import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import {
  AppError,
  AuthenticationError,
  ExpiredTokenError,
} from "../../errors/CustomErrors";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../../config/environment";

class Validators {
  static isAdmin(
    arg0: string,
    tokenIsValid: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void | {}>,
    isAdmin: any,
    arg3: (req: Request, _res: Response, next: NextFunction) => void,
    episodeTitleExists: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>,
    register: (req: Request, res: Response) => Promise<void>
  ) {
    throw new Error("Method not implemented.");
  }
  static bodyIsValid = (schema: ZodTypeAny) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      return next();
    };
  };

  static tokenIsValid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | {}> => {
    const authorization: string | undefined = req.headers.authorization;
    if (!authorization) throw new AuthenticationError("Missing Bearer Token");
    const token = authorization.split(" ")[1];

    verify(token, SECRET_KEY, (error: any, decoded: any): void => {
      if (error instanceof TokenExpiredError)
        throw new ExpiredTokenError(error.message, error.expiredAt);
      if (error) throw new AuthenticationError("Token inválido");

      if (decoded.role !== "admin") {
        throw new AppError("Forbidden", 403);
      }

      res.locals.userId = decoded.userId;
      res.locals.role = decoded.role;
    });
    return next();
  };
}

export { Validators };
