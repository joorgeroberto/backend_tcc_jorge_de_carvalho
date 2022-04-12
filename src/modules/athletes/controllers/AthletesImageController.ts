import { Request, Response } from 'express';
import UpdateAthleteImageService from '../services/UpdateAthleteImageService';

export default class AthletesImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateImage = new UpdateAthleteImageService();

    const user = updateImage.execute({
      athlete_id: request.athlete.id,
      imageFileName: request.file?.filename as string,
    });

    return response.json(user);
  }
}
