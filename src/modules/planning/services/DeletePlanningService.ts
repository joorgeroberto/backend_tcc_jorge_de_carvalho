import AthletesRepositories from '@modules/athletes/typeorm/repositories/AthletesRepositories';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PlanningRepositories from '../typeorm/repositories/PlanningRepositories';

interface IRequest {
  planningId: string;
  advisorId: string;
}

class DeletePlanningService {
  public async execute({ planningId, advisorId }: IRequest): Promise<void> {
    const planningRepositories = getCustomRepository(PlanningRepositories);

    const planning = await planningRepositories.findById(planningId);
    if (!planning) {
      throw new AppError('Planning not found', 404);
    }

    const athletesRepositories = getCustomRepository(AthletesRepositories);
    const advisor = await athletesRepositories.findById(advisorId);
    const isAdvisor = advisor?.user_type === 'advisor';

    if (!isAdvisor) {
      throw new AppError(
        'Only Advisors can delete Plannings. Please, try again with other user.',
        403,
      );
    }

    await planningRepositories.remove(planning);
  }
}

export default DeletePlanningService;
