import prisma from "../config/prisma";
import {
  SRestrictionsResponse,
  TRestrictionsRequest,
  TRestrictionsResponse,
} from "../schemas";

class RestrictionService {
  private static validateAndTransformRestriction = (
    restriction: any
  ): TRestrictionsResponse => {
    return SRestrictionsResponse.parse(restriction);
  };

  static create = async (
    data: TRestrictionsRequest
  ): Promise<TRestrictionsResponse> => {
    const restriction = await prisma.restrictions.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformRestriction(restriction);
  };

  static getAll = async (
    profileId: string
  ): Promise<TRestrictionsResponse[]> => {
    const restrictions = await prisma.restrictions.findMany({
      where: { profileId },
    });

    return SRestrictionsResponse.array().parse(restrictions);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.restrictions.delete({
      where: { id },
    });
  };
}

export { RestrictionService };
