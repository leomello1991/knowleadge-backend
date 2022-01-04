import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private userstokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private daysjsDateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userstokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Token Invalid');
    }

    const dateNow = this.daysjsDateProvider.dateNow();

    if (userToken.expires_date < dateNow) {
      throw new AppError('This token is already expired');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userstokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
