import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
