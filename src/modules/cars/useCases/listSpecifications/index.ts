import { SpecficationRepository } from '../../repositories/implementations/SpecificationRepository';
import { ListSpecificationsController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationsRepository = SpecficationRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase,
);

export { listSpecificationsController };
