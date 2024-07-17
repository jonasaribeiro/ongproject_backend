import prisma from "../config/prisma";
import {
  SProfileResponse,
  TProfileRequest,
  TProfileResponse,
  TProfileUpdate,
} from "../schemas";

class ProfileService {
  private static validateAndTransformProfile = (
    profile: any
  ): TProfileResponse => {
    return SProfileResponse.parse(profile);
  };

  static create = async (data: TProfileRequest): Promise<TProfileResponse> => {
    const { age, avatarId, categories, name, userId } = { ...data };
    const profile = await prisma.profile.create({
      data: {
        age,
        avatarId,
        name,
        userId,
      },
    });

    if (categories) {
      const categoriesData = categories.map(category => {
        return { profileId: profile.id, categoryId: category };
      });

      await prisma.preferences.createMany({ data: categoriesData });
    }

    const profileAllData = await prisma.profile.findUniqueOrThrow({
      where: { id: profile.id },
      include: {
        ageRating: { select: { name: true } },
        preferences: { select: { category: true } },
        myList: { select: { movie: true, serie: true } },
        restrictions: { select: { movie: true, serie: true } },
        avatar: true,
        watchingMovies: {
          where: { complete: false },
          include: { movie: true },
        },
        watchingSeries: {
          where: { complete: false },
          include: { episode: true },
        },
      },
    });

    return profileAllData;
  };

  static getAll = async (userId: string): Promise<TProfileResponse[]> => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId,
      },
    });

    return SProfileResponse.array().parse(profiles);
  };

  static getById = async (id: string): Promise<TProfileResponse> => {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: { id },
      include: {
        ageRating: { select: { name: true } },
        preferences: { select: { category: true } },
        myList: { select: { movie: true, serie: true } },
        restrictions: { select: { movie: true, serie: true } },
        avatar: true,
        watchingMovies: {
          where: { complete: false },
          include: { movie: true },
        },
        watchingSeries: {
          where: { complete: false },
          include: { episode: true },
        },
      },
    });

    return profile;
  };

  static update = async (
    id: string,
    data: TProfileUpdate
  ): Promise<TProfileResponse> => {
    const profile = await prisma.profile.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformProfile(profile);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.profile.delete({
      where: { id },
    });
  };
}

export { ProfileService };
