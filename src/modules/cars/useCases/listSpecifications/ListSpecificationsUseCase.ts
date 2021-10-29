import { Category } from '../../entities/Category';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}
  execute(): Category[] {
    const allSpecifications = this.specificationsRepository.list();
    return allSpecifications;
  }
}

export { ListSpecificationsUseCase };
