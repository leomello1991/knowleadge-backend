import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listcategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const allCategories = await listcategoriesUseCase.execute();

    return response.json(allCategories);
  }
}

export { ListCategoriesController };
