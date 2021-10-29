import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listcategoriesUseCase: ListCategoriesUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const allCategories = await this.listcategoriesUseCase.execute();

    return response.json(allCategories);
  }
}

export { ListCategoriesController };
