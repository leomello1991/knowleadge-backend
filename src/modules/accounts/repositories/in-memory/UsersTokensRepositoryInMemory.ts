import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersToken: UserTokens[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.usersToken.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    return this.usersToken.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );
  }
  async deleteById(id: string): Promise<void> {
    const filterId = this.usersToken.find(userToken => userToken.id === id);
    this.usersToken.splice(this.usersToken.indexOf(filterId));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      userToken => userToken.refresh_token === refresh_token,
    );
    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
