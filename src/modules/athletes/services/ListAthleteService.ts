import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';

class ListAthleteService {
  public async execute(): Promise<Athlete[]> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athletes = await athletesRepositories.find();

    return athletes;
  }
}

export default ListAthleteService;
