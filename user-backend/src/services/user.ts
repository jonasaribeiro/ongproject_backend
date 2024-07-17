import prisma from "../config/prisma";
import {
  SUserResponse,
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from "../schemas";

class UserService {
  static create = async (data: TUserRequest): Promise<TUserResponse> => {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return SUserResponse.parse(user);
  };

  static getById = async (id: string): Promise<TUserResponse> => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return SUserResponse.parse(user);
  };

  static update = async (
    id: string,
    data: TUserUpdate
  ): Promise<TUserResponse> => {
    const user = await prisma.user.update({
      where: { id },
      data: data,
    });
    return SUserResponse.parse(user);
  };

  static deactivate = async (id: string): Promise<void> => {
    await prisma.user.update({
      where: { id },
      data: { active: false },
    });
  };
}

export { UserService };
