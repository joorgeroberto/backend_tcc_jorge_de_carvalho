import { Request, Response } from 'express';
import UpdateAthletesGroupImageService from '../services/UpdateAthletesGroupImageService';

export default class AthletesGroupImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateImage = new UpdateAthletesGroupImageService();

    const group = updateImage.execute({
      advisor_id: request.athlete.id,
      imageFileName: request.file?.filename as string,
    });

    return response.json(group);
  }
}
