import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

class Validators {
  static bodyIsValid = (schema: ZodTypeAny) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
      console.log(req.body);
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      return next();
    };
  };
}

export default Validators;
