import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Athlete from '../../athletes/typeorm/entities/Athlete';
import AthletesRepositories from '../../athletes/typeorm/repositories/AthletesRepositories';

interface IRequest {
  athleteId: string;
}

class ListAthletesFromGroupService {
  public async execute({ athleteId }: IRequest): Promise<Athlete[]> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athlete = await athletesRepositories.findById(athleteId);
    if (!athlete) {
      throw new AppError('Athlete not found.', 404);
    }

    const groupId = athlete.group_id;
    const athletesListByGroup = await athletesRepositories.findByGroupId(groupId);

    return athletesListByGroup;
  }
}

export default ListAthletesFromGroupService;
