import { Request, Response } from "express";
import { LoginService } from "../services/login";

class LoginController {
  static loginUser = async (req: Request, res: Response) => {
    const loginData = await LoginService.createUserToken(req.body);

    res.status(200).json(loginData);
  };
}

export { LoginController };
