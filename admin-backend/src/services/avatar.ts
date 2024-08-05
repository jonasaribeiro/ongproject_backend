import prisma from "../config/prisma";
import {
  SAvatarResponse,
  TAvatarRequest,
  TAvatarResponse,
  TAvatarUpdate,
} from "../schemas";

class AvatarService {
  private static validateAndTransformAvatar = (user: any): TAvatarResponse => {
    return SAvatarResponse.parse(user);
  };

  static create = async (data: TAvatarRequest): Promise<TAvatarResponse> => {
    const avatar = await prisma.avatar.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformAvatar(avatar);
  };

  static getAll = async (): Promise<TAvatarResponse[]> => {
    const avatars = await prisma.avatar.findMany({});

    return SAvatarResponse.array().parse(avatars);
  };

  static getById = async (id: string): Promise<TAvatarResponse> => {
    const avatar = await prisma.avatar.findUniqueOrThrow({
      where: { id },
    });
    return this.validateAndTransformAvatar(avatar);
  };

  static update = async (
    id: string,
    data: TAvatarUpdate
  ): Promise<TAvatarResponse> => {
    const avatar = await prisma.avatar.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformAvatar(avatar);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.avatar.delete({
      where: { id },
    });
  };
}

export { AvatarService };
