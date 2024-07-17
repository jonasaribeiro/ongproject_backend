import { Request, Response } from "express";
import { MyListService } from "../services/myList";

class MyListController {
  static register = async (req: Request, res: Response) => {
    const myList = await MyListService.create(req.body);
    res.status(201).json(myList);
  };

  static getAll = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const myLists = await MyListService.getAll(profileId);

    res.status(200).json(myLists);
  };

  static delete = async (req: Request, res: Response) => {
    const myListId = req.params.id;
    await MyListService.delete(myListId);

    res.status(200).json({ message: "Content on my list deleted with sucess" });
  };
}

export { MyListController };
