import prisma from "../config/prisma";
import {
  SResolutionResponse,
  TResolutionRequest,
  TResolutionResponse,
  TResolutionUpdate,
} from "../schemas";

class ResolutionService {
  private static validateAndTransformResolution = (
    resolution: any
  ): TResolutionResponse => {
    return SResolutionResponse.parse(resolution);
  };

  static create = async (
    data: TResolutionRequest
  ): Promise<TResolutionResponse> => {
    const resolution = await prisma.resolution.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformResolution(resolution);
  };

  static getAll = async (): Promise<TResolutionResponse[]> => {
    const resolutions = await prisma.resolution.findMany({});

    return SResolutionResponse.array().parse(resolutions);
  };

  static getById = async (id: string): Promise<TResolutionResponse> => {
    const resolution = await prisma.resolution.findUniqueOrThrow({
      where: { id },
    });
    return this.validateAndTransformResolution(resolution);
  };

  static update = async (
    id: string,
    data: TResolutionUpdate
  ): Promise<TResolutionResponse> => {
    const resolution = await prisma.resolution.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformResolution(resolution);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.resolution.delete({
      where: { id },
    });
  };
}

export { ResolutionService };
