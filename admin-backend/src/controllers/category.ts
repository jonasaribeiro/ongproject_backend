import { Request, Response } from "express";
import { CategoryService } from "../services/category";

class CategoryController {
  static register = async (req: Request, res: Response) => {
    const category = await CategoryService.create(req.body);
    res.status(201).json(category);
  };

  static getAll = async (req: Request, res: Response) => {
    const categories = await CategoryService.getAll();

    res.status(200).json(categories);
  };

  static getById = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const category = await CategoryService.getById(categoryId);

    res.status(200).json(category);
  };

  static update = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const category = await CategoryService.update(categoryId, req.body);

    res.status(200).json(category);
  };

  static delete = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    await CategoryService.delete(categoryId);

    res.status(200).json({ message: "Category deleted with sucess" });
  };
}

export { CategoryController };
