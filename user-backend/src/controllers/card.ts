import { Request, Response } from "express";
import { CardService } from "../services/card";

class CardController {
  static register = async (req: Request, res: Response) => {
    const newCard = await CardService.create(req.body);
    res.status(201).json(newCard);
  };

  static getAll = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const cards = await CardService.getAll(userId);

    res.status(200).json(cards);
  };

  static getById = async (req: Request, res: Response) => {
    const cardId = req.params.id;
    const card = await CardService.getById(cardId);

    res.status(200).json(card);
  };

  static update = async (req: Request, res: Response) => {
    const cardId = req.params.id;
    const updatedCard = await CardService.update(cardId, req.body);

    res.status(200).json(updatedCard);
  };

  static delete = async (req: Request, res: Response) => {
    const cardId = req.params.id;
    await CardService.delete(cardId);

    res.status(200).json({ message: "Card deleted with sucess!" });
  };
}

export { CardController };
