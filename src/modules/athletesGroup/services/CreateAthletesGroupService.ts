import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AthletesGroup from '../typeorm/entities/AthletesGroup';
import AthletesGroupRepositories from '../typeorm/repositories/AthletesGroupRepositories';

interface IRequest {
  group_name: string;
  athletes_quantity: number;
  sport_name: string;
}

class CreateAthletesGroupService {
  public async execute({
    group_name,
    athletes_quantity,
    sport_name,
  }: IRequest): Promise<AthletesGroup> {
    const athletesGroupRepositories = getCustomRepository(AthletesGroupRepositories);
    const groupWithNameExists = await athletesGroupRepositories.findByName(group_name);

    if (groupWithNameExists) {
      throw new AppError('There is already one athletes group with this name.', 409);
    }

    console.log(group_name, athletes_quantity, sport_name);

    const athletesGroup = athletesGroupRepositories.create({
      name: group_name,
      athletes_quantity,
      sport_name: sport_name || 'run',
    });

    await athletesGroupRepositories.save(athletesGroup);

    return athletesGroup;
  }
}

export default CreateAthletesGroupService;
