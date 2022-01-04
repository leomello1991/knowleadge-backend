import { IUserCreateDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/error/AppError';

import { CreateUsersUseCase } from '../createUser/CreateUsersUseCase';
import { AuthenticateUsersUseCase } from './AuthenticateUsersUseCase';

let authenticateUsersUseCase: AuthenticateUsersUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let daysjsDateProvider: DayjsDateProvider;
let createUsersUseCase: CreateUsersUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    daysjsDateProvider = new DayjsDateProvider();
    authenticateUsersUseCase = new AuthenticateUsersUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      daysjsDateProvider,
    );
    createUsersUseCase = new CreateUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to generate token', async () => {
    const user: IUserCreateDTO = {
      driver_license: '123456',
      email: 'teste@teste.com.br',
      name: 'John Doo',
      password: '123465679',
    };

    await createUsersUseCase.execute(user);

    const authenticate = await authenticateUsersUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(authenticate).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUsersUseCase.execute({
        email: 'false@em.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate with user incorrect', async () => {
    const user: IUserCreateDTO = {
      driver_license: '123456',
      email: 'teste@teste.com.br',
      name: 'John Doo',
      password: '123465679',
    };

    await createUsersUseCase.execute(user);

    await expect(
      authenticateUsersUseCase.execute({
        email: ' user.email',
        password: user.password,
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
  it('should not be able to authenticate with password incorrect', async () => {
    const user: IUserCreateDTO = {
      driver_license: '123456',
      email: 'teste@teste.com.br',
      name: 'John Doo',
      password: '123465679',
    };

    await createUsersUseCase.execute(user);
    await expect(
      authenticateUsersUseCase.execute({
        email: user.email,
        password: '12345',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
