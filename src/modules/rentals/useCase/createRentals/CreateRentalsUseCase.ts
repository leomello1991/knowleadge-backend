import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalsUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user');
    }

    const dateNow = this.dayjsDateProvider.dateNow();

    const compare = this.dayjsDateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumHour) {
      throw new AppError('Invalid return Time');
    }
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }
}

export { CreateRentalsUseCase };
