import prisma from "../config/prisma";
import { AppError } from "../errors/CustomErrors";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { TLoginRequest, TLoginResponse } from "../schemas";

class LoginService {
  static createUserToken = async ({
    email,
    password,
  }: TLoginRequest): Promise<TLoginResponse> => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user?.active == false) {
      throw new AppError("Your account is disabled", 403);
    }

    if (!user) {
      throw new AppError("Invalid credentials", 403);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 403);
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY!,
      {
        expiresIn: process.env.TOKEN_EXPIRES_IN!,
        subject: "null",
      }
    );

    return {
      token,
    };
  };
}

export { LoginService };
