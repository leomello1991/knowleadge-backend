import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/error/AppError';

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: IUserCreateDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('user already exists with this email');
    }

    const passwordHash = await hash(password, 8);
    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUsersUseCase };
