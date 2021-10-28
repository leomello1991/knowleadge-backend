import { SpecficationRepository } from '../../repositories/implementations/SpecificationRepository';
import { CreateSpecificatonController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const createSpecificationsRepository = SpecficationRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  createSpecificationsRepository,
);
const createSpecificationControler = new CreateSpecificatonController(
  createSpecificationUseCase
);

export { createSpecificationControler };
