import { NextFunction, Request, Response } from "express";
import * as CustomErrors from "./CustomErrors";
import { ZodError } from "zod";

class ErrorHandler {
  private static defaultErrorMapper(err: any) {
    return {
      status: err.statusCode || 500,
      message: err.message || "Internal Server Error",
    };
  }

  private static errorMap: {
    [key: string]: (err: any) => { status: number; message: any };
  } = {
    [CustomErrors.ExpiredTokenError.name]: (err) => ({
      status: err.statusCode,
      message: { info: err.message, expiredIn: err.expiredIn },
    }),
    [ZodError.name]: (err: ZodError) => ({
      status: 400,
      message: err.flatten().fieldErrors,
    }),
  };

  static async handle(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const errorType = err.constructor.name;
    const errorHandler =
      ErrorHandler.errorMap[errorType] || ErrorHandler.defaultErrorMapper;
    const { status, message } = errorHandler(err);

    return res.status(status).json({ message });
  }
}

export default ErrorHandler;
