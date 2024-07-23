import prisma from "../config/prisma";
import { SMyListResponse, TMyListRequest, TMyListResponse } from "../schemas";

class MyListService {
  static create = async (data: TMyListRequest): Promise<TMyListResponse> => {
    const myList = await prisma.myList.create({
      data: {
        ...data,
      },
    });
    return SMyListResponse.parse(myList);
  };

  static getAll = async (profileId: string): Promise<TMyListResponse[]> => {
    const myLists = await prisma.myList.findMany({
      where: { profileId },
    });

    return SMyListResponse.array().parse(myLists);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.myList.delete({
      where: { id },
    });
  };
}

export { MyListService };
