import prisma from "../config/prisma";
import {
  SPreferencesResponse,
  TPreferencesRequest,
  TPreferencesResponse,
} from "../schemas";

class PreferenceService {
  static create = async (
    data: TPreferencesRequest
  ): Promise<TPreferencesResponse> => {
    const restriction = await prisma.preferences.create({
      data: {
        ...data,
      },
    });
    return SPreferencesResponse.parse(restriction);
  };

  static getAll = async (
    profileId: string
  ): Promise<TPreferencesResponse[]> => {
    const preferences = await prisma.preferences.findMany({
      where: { profileId },
    });

    return SPreferencesResponse.array().parse(preferences);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.preferences.delete({
      where: { id },
    });
  };
}

export { PreferenceService };
