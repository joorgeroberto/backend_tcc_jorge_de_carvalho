import { getCustomRepository } from 'typeorm';
import AthletesGroup from '../typeorm/entities/AthletesGroup';
import AthletesGroupRepositories from '../typeorm/repositories/AthletesGroupRepositories';

class ListAthleteService {
  public async execute(): Promise<AthletesGroup[]> {
    const athletesGroupRepositories = getCustomRepository(AthletesGroupRepositories);

    const athletesGroup = await athletesGroupRepositories.find();

    return athletesGroup;
  }
}

export default ListAthleteService;
