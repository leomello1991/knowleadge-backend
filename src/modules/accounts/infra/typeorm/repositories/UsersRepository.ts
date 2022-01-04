import { getRepository, Repository } from 'typeorm';

import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: IUserCreateDTO): Promise<void> {
    const user = await this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };
