import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsUseCase } from './CreateCarsUseCase';

class CreateCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
    } = request.body;
    const createCarsUserCase = container.resolve(CreateCarsUseCase);

    const car = await createCarsUserCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsController };
