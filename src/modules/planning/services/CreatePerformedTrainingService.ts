import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PerformedTraining from '../typeorm/entities/PerformedTraining';
import PerformedTrainingRepositories from '../typeorm/repositories/PerformedTrainingRepositories';

interface IRequest {
  calories: number;
  duration: string;
  distance: string;
  vMed: number;
  vMax: number;
  fcRest: number;
  fcMed: number;
  fcMax: number;
  trainingId: string;
}

class CreatePerformedTrainingService {
  public async execute({
    calories,
    duration,
    distance,
    vMed,
    vMax,
    fcRest,
    fcMed,
    fcMax,
    trainingId,
  }: IRequest): Promise<PerformedTraining> {
    const performedTrainingRepositories = getCustomRepository(PerformedTrainingRepositories);

    const performedTrainingExists = await performedTrainingRepositories.findByTrainingId(
      trainingId,
    );

    if (performedTrainingExists) {
      throw new AppError('This training has already been performed.', 409);
    }

    const planning = performedTrainingRepositories.create({
      calories,
      duration,
      distance,
      vMed,
      vMax,
      fcRest,
      fcMed,
      fcMax,
      trainingId,
    });

    await performedTrainingRepositories.save(planning);

    return planning;
  }
}

export default CreatePerformedTrainingService;
