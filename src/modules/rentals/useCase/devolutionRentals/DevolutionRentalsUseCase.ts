import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/error/AppError';

interface IRequest {
  id: string;
  user_id?: string;
}

@injectable()
class DevolutionRentalsUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: DayjsDateProvider,
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimumDaily = 1;
    if (!rental) {
      throw new AppError('Rental does not exist');
    }
    const dateNow = this.dayjsDateProvider.dateNow();

    let daily = this.dayjsDateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dayjsDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dayjsDateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalsUseCase };
