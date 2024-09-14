import { Request, Response, NextFunction } from "express";

const checkIP =
  (AllowedIPs: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const requestIP = req.ip;

    if (requestIP && AllowedIPs.includes(requestIP)) {
      return next();
    }

    res.status(403).send("Acesso negado");
  };

export default checkIP;
