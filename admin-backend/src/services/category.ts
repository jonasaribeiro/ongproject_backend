import prisma from "../config/prisma";
import {
  SCategoryResponse,
  TCategoryRequest,
  TCategoryResponse,
  TCategoryUpdate,
} from "../schemas";

class CategoryService {
  private static validateAndTransformCategory = (
    category: any
  ): TCategoryResponse => {
    return SCategoryResponse.parse(category);
  };

  static create = async (
    data: TCategoryRequest
  ): Promise<TCategoryResponse> => {
    const category = await prisma.category.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformCategory(category);
  };

  static getAll = async (): Promise<TCategoryResponse[]> => {
    const categories = await prisma.category.findMany({});

    return SCategoryResponse.array().parse(categories);
  };

  static getById = async (id: string): Promise<TCategoryResponse> => {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id },
    });
    return this.validateAndTransformCategory(category);
  };

  static update = async (
    id: string,
    data: TCategoryUpdate
  ): Promise<TCategoryResponse> => {
    const category = await prisma.category.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformCategory(category);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.category.delete({
      where: { id },
    });
  };
}

export { CategoryService };
