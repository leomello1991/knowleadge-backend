import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsSpecificationsUseCase } from './CreateCarsSpecificationsUseCase';

class CreateCarsSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;
    const createCarsSpecificationsUseCase = container.resolve(
      CreateCarsSpecificationsUseCase,
    );

    const createCarsSpecifications =
      await createCarsSpecificationsUseCase.execute({
        car_id: id,
        specifications_id,
      });
    return response.json(createCarsSpecifications);
  }
}

export { CreateCarsSpecificationController };
