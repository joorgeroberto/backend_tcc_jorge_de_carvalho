import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AthletesGroupRepositories from '../typeorm/repositories/AthletesGroupRepositories';

import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

interface IRequest {
  id: string;
}

class DeleteAthletesGroupService {
  public async execute({ id }: IRequest): Promise<void> {
    const athletesGroupRepositories = getCustomRepository(AthletesGroupRepositories);

    const athletesGroup = await athletesGroupRepositories.findOne(id);

    if (!athletesGroup) {
      throw new AppError('Athletes Group not found', 404);
    }

    if (athletesGroup.image) {
      const athletesGroupImageFilePath = path.join(uploadConfig.directory, athletesGroup.image);
      const athletesGroupImageFileExists = await fs.promises.stat(athletesGroupImageFilePath);

      if (athletesGroupImageFileExists) {
        await fs.promises.unlink(athletesGroupImageFilePath);
      }
    }

    await athletesGroupRepositories.remove(athletesGroup);
  }
}

export default DeleteAthletesGroupService;
