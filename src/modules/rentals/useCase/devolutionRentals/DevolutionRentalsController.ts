import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalsUseCase } from './DevolutionRentalsUseCase';

class DevolutionRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.params;
    const { id } = request.params;
    const devolutionRentalsUseCase = container.resolve(
      DevolutionRentalsUseCase,
    );

    const devolutionRental = await devolutionRentalsUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(devolutionRental);
  }
}

export { DevolutionRentalsController };
