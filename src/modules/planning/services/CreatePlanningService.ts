import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Planning from '../typeorm/entities/Planning';
import PlanningRepositories from '../typeorm/repositories/PlanningRepositories';
import AthletesRepositories from '../../athletes/typeorm/repositories/AthletesRepositories';

interface IRequest {
  name: string;
  numberOfWeeks: number;
  startDate: string;
  endDate: string;
  advisorId: string;
  athleteId: string;
  trainings: Array<object>;
}

class CreatePlanningService {
  public async execute({
    name,
    numberOfWeeks,
    startDate,
    endDate,
    advisorId,
    athleteId,
    trainings,
  }: IRequest): Promise<Planning> {
    const planningRepositories = getCustomRepository(PlanningRepositories);
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const advisorExists = await athletesRepositories.findById(advisorId);
    const isAdvisor = advisorExists?.user_type === 'advisor';

    if (!isAdvisor) {
      throw new AppError(
        'Only Advisors can create Plannings. Please, try again with other user.',
        403,
      );
    }

    const athleteExists = await athletesRepositories.findById(athleteId);
    if (!athleteExists) {
      throw new AppError('Athlete not found', 404);
    }

    const planning = planningRepositories.create({
      name,
      numberOfWeeks,
      startDate,
      endDate,
      athleteId,
      trainings,
    });

    await planningRepositories.save(planning);

    return planning;
  }
}

export default CreatePlanningService;
