import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarsImagesUseCase } from './UploadCarsImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarsImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarsImagesUseCase = container.resolve(UploadCarsImagesUseCase);

    const image_name = images.map(file => file.filename);

    const uploadImages = await uploadCarsImagesUseCase.execute({
      car_id: id,
      image_name,
    });
    return response.json(uploadImages);
  }
}

export { UploadCarsImagesController };
