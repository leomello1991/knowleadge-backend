import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersREpository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersREpository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
