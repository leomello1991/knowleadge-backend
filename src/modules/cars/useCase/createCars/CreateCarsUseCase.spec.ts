import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/error/AppError';

import { CreateCarsUseCase } from './CreateCarsUseCase';

let createCarsUserCase: CreateCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUserCase = new CreateCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarsUserCase.execute({
      name: 'test',
      description: 'test description',
      license_plate: 'test license',
      brand: 'test brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 1000,
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create two cars with the same license plate', async () => {
    await createCarsUserCase.execute({
      name: 'test 2',
      description: 'test description',
      license_plate: 'test license',
      brand: 'test brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 1000,
    });
    await expect(
      createCarsUserCase.execute({
        name: 'test',
        description: 'test description',
        license_plate: 'test license',
        brand: 'test brand',
        category_id: 'category',
        daily_rate: 100,
        fine_amount: 1000,
      }),
    ).rejects.toEqual(new AppError('this car already exists'));
  });

  it('should be able to create a new car', async () => {
    const car = await createCarsUserCase.execute({
      name: 'car avaliable',
      description: 'test description',
      license_plate: 'test license',
      brand: 'test brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 1000,
    });
    expect(car.available).toBe(true);
  });
});
