import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/error/AppError';

import { CreateCarsSpecificationsUseCase } from './CreateCarsSpecificationsUseCase';

let createCarsSpecificationsUseCase: CreateCarsSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create cars specifications', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarsSpecificationsUseCase = new CreateCarsSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should not be able to add new specifications to a now-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];
    await expect(
      createCarsSpecificationsUseCase.execute({
        car_id,
        specifications_id,
      }),
    ).rejects.toEqual(new AppError('Cars does not exist'));
  });

  it('should be able to add new specifications to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'test description 2',
      license_plate: 'fqf-4g18',
      brand: 'Ferrari',
      category_id: 'category_id',
      daily_rate: 100,
      fine_amount: 1000,
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test description',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarsSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
