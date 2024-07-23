import prisma from "../config/prisma";
import { SResolutionResponse, TResolutionResponse } from "../schemas";

class ResolutionService {
  static getAll = async (): Promise<TResolutionResponse[]> => {
    const resolutions = await prisma.resolution.findMany({});

    return SResolutionResponse.array().parse(resolutions);
  };

  static getById = async (id: string): Promise<TResolutionResponse> => {
    const resolution = await prisma.resolution.findUniqueOrThrow({
      where: { id },
    });
    return SResolutionResponse.parse(resolution);
  };
}

export { ResolutionService };
