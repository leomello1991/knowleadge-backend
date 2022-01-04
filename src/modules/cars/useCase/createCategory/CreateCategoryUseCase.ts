import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  name: string;
  description: string;
}
@injectable() // transforma este use case em uma classe que sera injetada por exemplo no controler
class CreateCategoryUseCase {
  constructor(
    // busca dentro do container qual a clase que esta referenciada no registro com este nome
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
