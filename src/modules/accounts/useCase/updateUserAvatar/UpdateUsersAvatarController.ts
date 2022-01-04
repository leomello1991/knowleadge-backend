import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUsersAvatarUseCase } from './UpdateUsersAvatarUseCase';

class UpdateUsersAvatarController {
  async handle(request: Request, response: Response): Promise<void> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateUsersAvatarUseCase = container.resolve(
      UpdateUsersAvatarUseCase,
    );

    await updateUsersAvatarUseCase.execute({ user_id: id, avatar_file });

    response.status(204).send();
  }
}

export { UpdateUsersAvatarController };
