import { NextFunction, Request, Response } from "express";
import * as CustomErrors from "./CustomErrors";
import { ZodError } from "zod";
import fs from "fs";
import path from "path";

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

  private static async deleteFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file, index) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          ErrorHandler.deleteFolderRecursive(curPath); // Recursively delete folder
        } else {
          fs.unlinkSync(curPath); // Delete file
        }
      });
      fs.rmdirSync(folderPath); // Remove directory
    }
  }

  static async handle(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const errorType = err.constructor.name;
    const errorHandler =
      ErrorHandler.errorMap[errorType] || ErrorHandler.defaultErrorMapper;
    const { status, message } = errorHandler(err);

    console.log("Lançou algum erro");
    console.log(`status: ${status}`);
    console.log(`message: ${message}`);

    console.log("Verificando se há arquivos a ser deletado");
    const title = req.body.title?.replace(/\s+/g, "_");
    if (title) {
      const folderPath = path.join(
        __dirname,
        "../../../database/movies",
        title
      );
      console.log("Deletando pasta " + folderPath);
      await ErrorHandler.deleteFolderRecursive(folderPath);
      console.log("Pasta deletada");
    }

    return res.status(status).json({ message });
  }
}

export default ErrorHandler;
