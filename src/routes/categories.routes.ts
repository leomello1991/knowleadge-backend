import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategorie';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';


const categoriesRoutes = Router();
const upload = multer({
  dest: './temp'
})

categoriesRoutes.post('/', (request, response) => {
  console.log("reload")
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request,response);
})

export { categoriesRoutes };