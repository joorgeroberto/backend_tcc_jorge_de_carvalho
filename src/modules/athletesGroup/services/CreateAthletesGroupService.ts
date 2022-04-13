import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AthletesGroup from '../typeorm/entities/AthletesGroup';
import AthletesGroupRepositories from '../typeorm/repositories/AthletesGroupRepositories';

interface IRequest {
  group_name: string;
  athletes_quantity: number;
  sport_name: string;

  advisor_name: string;
  advisor_id: string;
}

class CreateAthletesGroupService {
  public async execute({
    group_name,
    athletes_quantity,
    sport_name,
    advisor_name,
    advisor_id,
  }: IRequest): Promise<AthletesGroup> {
    const athletesGroupRepositories = getCustomRepository(AthletesGroupRepositories);
    const groupWithNameExists = await athletesGroupRepositories.findByName(group_name);
    const groupWithThisAdvisorExists = await athletesGroupRepositories.findByAdvisorId(advisor_id);

    if (groupWithNameExists) {
      throw new AppError('There is already one athletes group with this name.', 409);
    }

    if (groupWithThisAdvisorExists) {
      throw new AppError('This advisor already have one group.', 409);
    }

    const athletesGroup = athletesGroupRepositories.create({
      name: group_name,
      athletes_quantity,
      sport_name: sport_name || 'run',
      advisor_name,
      advisor_id,
    });

    await athletesGroupRepositories.save(athletesGroup);

    return athletesGroup;
  }
}

export default CreateAthletesGroupService;
