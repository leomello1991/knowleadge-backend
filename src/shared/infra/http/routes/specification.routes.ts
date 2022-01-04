import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCase/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCase/listSpecifications/ListSpecificationsController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
