import { Router } from 'express';

import { CreateRentalsController } from '@modules/rentals/useCase/createRentals/CreateRentalsController';
import { DevolutionRentalsController } from '@modules/rentals/useCase/devolutionRentals/DevolutionRentalsController';
import { ListRentalsByUserController } from '@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalsController = new DevolutionRentalsController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalsController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalsController.handle,
);
rentalRoutes.get(
  '/user-list',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalRoutes };
