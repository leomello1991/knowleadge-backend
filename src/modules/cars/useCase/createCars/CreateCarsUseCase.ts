import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
}

@injectable()
class CreateCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
    brand,
    specifications,
  }: IRequest): Promise<Car> {
    const carsAlreadyExist = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carsAlreadyExist) {
      throw new AppError('this car already exists');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
      specifications,
    });

    return car;
  }
}

export { CreateCarsUseCase };
