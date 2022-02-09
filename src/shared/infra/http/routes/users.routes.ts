import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUsersController } from '@modules/accounts/useCase/createUser/CreateUsersController';
import { ProfileUserController } from '@modules/accounts/useCase/profileUserUseCase/ProfileUserController';
import { UpdateUsersAvatarController } from '@modules/cars/infra/updateUserAvatar/UpdateUsersAvatarController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUsersController();
const updateUserController = new UpdateUsersAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserController.handle,
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
