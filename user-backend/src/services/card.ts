import prisma from "../config/prisma";
import {
  SCardResponse,
  TCardResponse,
  TCardRequest,
  TCardUpdate,
} from "../schemas";

class CardService {
  static create = async (data: TCardRequest): Promise<TCardResponse> => {
    const card = await prisma.card.create({
      data: {
        ...data,
      },
    });
    return SCardResponse.parse(card);
  };

  static getAll = async (id: string): Promise<TCardResponse[]> => {
    const cards = await prisma.card.findMany({ where: { userId: id } });
    return cards;
  };

  static getById = async (id: string): Promise<TCardResponse> => {
    const card = await prisma.card.findUniqueOrThrow({
      where: { id },
    });

    return SCardResponse.parse(card);
  };

  static update = async (
    id: string,
    data: TCardUpdate
  ): Promise<TCardResponse> => {
    const card = await prisma.card.update({
      where: { id },
      data: data,
    });
    return SCardResponse.parse(card);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.card.delete({
      where: { id },
    });
  };
}

export { CardService };
