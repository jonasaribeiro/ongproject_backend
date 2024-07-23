import prisma from "../config/prisma";
import { SCategoryResponse, TCategoryResponse } from "../schemas";

class CategoryService {
  static getAll = async (): Promise<TCategoryResponse[]> => {
    const categories = await prisma.category.findMany({});

    return SCategoryResponse.array().parse(categories);
  };

  static getById = async (id: string): Promise<TCategoryResponse> => {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id },
    });
    return SCategoryResponse.parse(category);
  };
}

export { CategoryService };
