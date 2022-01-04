import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = await this.categories.find(
      categories => categories.name === name,
    );
    return category;
  }
  async list(): Promise<Category[]> {
    const allCategories = await this.categories;
    return allCategories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
