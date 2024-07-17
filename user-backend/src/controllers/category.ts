import { Request, Response } from "express";
import { CategoryService } from "../services/category";

class CategoryController {
  static getAll = async (req: Request, res: Response) => {
    const categories = await CategoryService.getAll();

    res.status(200).json(categories);
  };

  static getById = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const category = await CategoryService.getById(categoryId);

    res.status(200).json(category);
  };
}

export { CategoryController };
