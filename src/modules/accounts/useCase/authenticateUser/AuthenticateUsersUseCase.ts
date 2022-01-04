import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      secret,
      expiresIn,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = authConfig.jwt;

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expires_in_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUsersUseCase };
