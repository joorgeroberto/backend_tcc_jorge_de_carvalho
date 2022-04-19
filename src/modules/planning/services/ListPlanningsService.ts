import { getCustomRepository } from 'typeorm';
import Planning from '../typeorm/entities/Planning';
import PlanningRepositories from '../typeorm/repositories/PlanningRepositories';

class ListPlanningsService {
  public async execute(): Promise<Planning[]> {
    const planningRepositories = getCustomRepository(PlanningRepositories);

    const plannings = await planningRepositories.find();

    return plannings;
  }
}

export default ListPlanningsService;
