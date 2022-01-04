import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('specificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}
  async execute(): Promise<Specification[]> {
    const allSpecifications = await this.specificationsRepository.list();
    return allSpecifications;
  }
}

export { ListSpecificationsUseCase };
