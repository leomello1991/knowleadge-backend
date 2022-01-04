import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      token,
      authConfig.jwt.secret_refresh_token,
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exist');
    }
    await this.usersTokensRepository.deleteById(userToken.id);
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      authConfig.jwt.expires_in_refresh_token_days,
    );
    const refresh_token = sign({ email }, authConfig.jwt.secret_refresh_token, {
      subject: sub,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, authConfig.jwt.secret, {
      subject: user_id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenUseCase };
