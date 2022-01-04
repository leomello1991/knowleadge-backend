import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/error/AppError';

import { CreateRentalsUseCase } from './CreateRentalsUseCase';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayAdd24hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalsUseCase = new CreateRentalsUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Teste',
      description: 'Teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 40,
      category_id: '1234',
      brand: 'Ferrari',
    });
    const rental = await createRentalsUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '12374',
      expected_return_date: dayAdd24hours,
      user_id: '123456',
    });

    await expect(
      createRentalsUseCase.execute({
        car_id: '654321',
        expected_return_date: dayAdd24hours,
        user_id: '123456',
      }),
    ).rejects.toEqual(new AppError('There is a rental in progress for user'));
  });
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '654321',
      expected_return_date: dayAdd24hours,
      user_id: '12345',
    });

    await expect(
      createRentalsUseCase.execute({
        car_id: '654321',
        expected_return_date: dayAdd24hours,
        user_id: '123456',
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental if with invalid return time', async () => {
    await expect(
      createRentalsUseCase.execute({
        user_id: '123',
        car_id: 'teste',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return Time'));
  });
});
