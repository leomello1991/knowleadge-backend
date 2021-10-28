import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listcategoriesUseCase: ListCategoriesUseCase) {}
  handle(request: Request, response: Response): Response {
    const allCategories = this.listcategoriesUseCase.execute();

    return response.json(allCategories);
  }
}

export { ListCategoriesController };
