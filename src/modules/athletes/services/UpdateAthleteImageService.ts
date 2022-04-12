import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';
import uploadConfig from '@config/upload';
import { response } from 'express';

interface IRequest {
  athlete_id: string;
  imageFileName: string;
}

class UpdateAthleteImageService {
  public async execute({ athlete_id, imageFileName }: IRequest): Promise<Athlete> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athlete = await athletesRepositories.findById(athlete_id);

    if (!athlete) {
      throw new AppError('Athlete not found.');
    }

    if (athlete.image) {
      const userImageFilePath = path.join(uploadConfig.directory, athlete.image);
      const userImageFileExists = await fs.promises.stat(userImageFilePath);

      // verificando de o usuario ja possui imagem.
      // Se possuir, deleta do banco.
      if (userImageFileExists) {
        await fs.promises.unlink(userImageFilePath);
      }
    }
    //Salvando um novo avatar no banco.
    athlete.image = imageFileName;

    await athletesRepositories.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteImageService;
