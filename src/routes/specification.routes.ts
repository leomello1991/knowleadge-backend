import { Router } from 'express';
import { createSpecificationControler } from '../modules/cars/useCases/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();


specificationsRoutes.post('/', (request, response) => {
  return createSpecificationControler.handle(request, response);
});

specificationsRoutes.get('/', (request, response) => {
  return listSpecificationsController.handle(request, response);
});

export { specificationsRoutes };
