import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/error/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send forgot password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    // eslint-disable-next-line prettier/prettier
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'teste@teste.com.br',
      name: 'John Doo',
      password: '123465679',
    });

    await sendForgotPasswordMailUseCase.execute('teste@teste.com.br');

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('leo@teste.com.br'),
    ).rejects.toEqual(new AppError('User not found'));
  });
  it('should be able to create an users token', async () => {
    const userToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'leo@melo.com.br',
      name: 'John Doo',
      password: '123465679',
    });

    await sendForgotPasswordMailUseCase.execute('leo@melo.com.br');
    expect(userToken).toHaveBeenCalled();
  });
});
