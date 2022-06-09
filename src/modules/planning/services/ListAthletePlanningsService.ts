import AthletesRepositories from '@modules/athletes/typeorm/repositories/AthletesRepositories';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Planning from '../typeorm/entities/Planning';
import PlanningRepositories from '../typeorm/repositories/PlanningRepositories';

interface IRequest {
  athleteId: string;
}

class ListAthletePlanningsService {
  public async execute({ athleteId }: IRequest): Promise<Planning[]> {
    const planningRepositories = getCustomRepository(PlanningRepositories);
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athleteExists = await athletesRepositories.findById(athleteId);
    if (!athleteExists) {
      throw new AppError('Athlete not found', 404);
    }

    const plannings = await planningRepositories.findByAthleteId(athleteId);

    return plannings;
  }
}

export default ListAthletePlanningsService;
