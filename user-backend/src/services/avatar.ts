import prisma from "../config/prisma";
import { SAvatarResponse, TAvatarResponse } from "../schemas";

class AvatarService {
  static getAll = async (): Promise<TAvatarResponse[]> => {
    const avatars = await prisma.avatar.findMany({});

    return SAvatarResponse.array().parse(avatars);
  };

  static getById = async (id: string): Promise<TAvatarResponse> => {
    const avatar = await prisma.avatar.findUniqueOrThrow({
      where: { id },
    });
    return SAvatarResponse.parse(avatar);
  };
}

export { AvatarService };
