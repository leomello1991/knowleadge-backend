import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able list all avaliable cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'test description 2',
      license_plate: 'fqf-4g18',
      brand: 'Ferrari',
      category_id: 'category_id',
      daily_rate: 100,
      fine_amount: 1000,
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car2',
      description: 'test description 2',
      license_plate: 'fqf-4g18',
      brand: 'Audi',
      category_id: 'category_id',
      daily_rate: 100,
      fine_amount: 1000,
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Audi',
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car3',
      description: 'test description 2',
      license_plate: 'fqf-4g18',
      brand: 'Audi',
      category_id: 'category_id',
      daily_rate: 100,
      fine_amount: 1000,
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'car3',
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car3',
      description: 'test description 2',
      license_plate: 'fqf-4g18',
      brand: 'Audi',
      category_id: '123456',
      daily_rate: 100,
      fine_amount: 1000,
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: '123456',
    });
    expect(cars).toEqual([car]);
  });
});
