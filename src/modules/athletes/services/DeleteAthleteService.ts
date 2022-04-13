import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';

import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

interface IRequest {
  id: string;
}

class DeleteAthleteService {
  public async execute({ id }: IRequest): Promise<void> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athlete = await athletesRepositories.findOne(id);

    if (!athlete) {
      throw new AppError('Athlete not found', 404);
    }

    if (athlete.image) {
      const athleteImageFilePath = path.join(uploadConfig.directory, athlete.image);
      const athleteImageFileExists = await fs.promises.stat(athleteImageFilePath);

      if (athleteImageFileExists) {
        await fs.promises.unlink(athleteImageFilePath);
      }
    }

    await athletesRepositories.remove(athlete);
  }
}

export default DeleteAthleteService;
