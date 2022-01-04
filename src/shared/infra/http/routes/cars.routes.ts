import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarsController } from '@modules/cars/useCase/createCars/CreateCarsController';
import { CreateCarsSpecificationController } from '@modules/cars/useCase/createCarsSpecifications/CreateCarsSpecificationsController';
import { ListAvailableCarsController } from '@modules/cars/useCase/listCars/ListAvailableCarsController';
import { UploadCarsImagesController } from '@modules/cars/useCase/uploadCarsImages/UploadCarsImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const uploadImages = multer(uploadConfig);

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationController =
  new CreateCarsSpecificationController();
const uploadsCarsImagesController = new UploadCarsImagesController();
carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle,
);
carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarsSpecificationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  uploadsCarsImagesController.handle,
);
export { carsRoutes };
