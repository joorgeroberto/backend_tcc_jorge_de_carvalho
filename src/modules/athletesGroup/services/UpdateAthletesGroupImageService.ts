import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import AthletesRepositories from '../../athletes/typeorm/repositories/AthletesRepositories';
import AthletesGroup from '../typeorm/entities/AthletesGroup';
import AthletesGroupRepositories from '../typeorm/repositories/AthletesGroupRepositories';
import uploadConfig from '@config/upload';

interface IRequest {
  advisor_id: string;
  imageFileName: string;
}

class UpdateAthletesGroupImageService {
  public async execute({ advisor_id, imageFileName }: IRequest): Promise<AthletesGroup> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athlete = await athletesRepositories.findById(advisor_id);

    if (!athlete) {
      throw new AppError('Advisor not found.');
    }

    const athleteIsAdvisor = athlete.user_type === 'advisor';
    if (!athleteIsAdvisor) {
      throw new AppError('Only advisors can change their group images.');
    }

    const athletesGroupRepositories = getCustomRepository(AthletesGroupRepositories);
    const athletesGroup = await athletesGroupRepositories.findById(athlete.group_id);

    if (!athletesGroup) {
      throw new AppError('Athletes Group not found.');
    }

    if (athletesGroup.image) {
      const athletesGroupImageFilePath = path.join(uploadConfig.directory, athletesGroup.image);
      const athletesGroupImageFileExists = await fs.promises.stat(athletesGroupImageFilePath);

      if (athletesGroupImageFileExists) {
        await fs.promises.unlink(athletesGroupImageFilePath);
      }
    }

    athletesGroup.image = imageFileName;

    await athletesGroupRepositories.save(athletesGroup);

    return athletesGroup;
  }
}

export default UpdateAthletesGroupImageService;
