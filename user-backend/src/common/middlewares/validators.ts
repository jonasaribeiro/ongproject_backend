import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import {
  AppError,
  AuthenticationError,
  ExpiredTokenError,
} from "../../errors/CustomErrors";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../../config/environment";
import prisma from "../../config/prisma";

class Validators {
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

      res.locals.userId = decoded.userId;
      res.locals.role = decoded.role;
    });
    return next();
  };

  static isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role: string = res.locals.role;

    if (role !== "admin") {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };

  static isUser = (req: Request, res: Response, next: NextFunction) => {
    const userIdToken: string = res.locals.userId;
    const userIdParam: string = req.params.id;

    if (userIdParam !== userIdToken) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };

  static profileIdBody = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdToken: string = res.locals.userId;
    const { profile_id } = req.body;

    const profile = await prisma.profile.findUniqueOrThrow({
      where: { id: profile_id },
    });

    if (profile.userId != userIdToken) {
      throw new AppError(
        "You are trying to modify data from a profile that is not yours",
        409
      );
    }
    res.locals.profileId = profile.id;
    return next();
  };

  static profileIdParams = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdToken: string = res.locals.userId;
    const profile_id = req.params.id;

    const profile = await prisma.profile.findUniqueOrThrow({
      where: { id: profile_id },
    });

    if (profile.userId != userIdToken) {
      throw new AppError(
        "You are trying to modify data from a profile that is not yours",
        409
      );
    }
    res.locals.profileId = profile.id;
    return next();
  };
}

export { Validators };
