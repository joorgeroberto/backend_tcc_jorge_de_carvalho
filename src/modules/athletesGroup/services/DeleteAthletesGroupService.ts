import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AthletesGroupRepositories from '../typeorm/repositories/AthletesGroupRepositories';

interface IRequest {
  id: string;
}

class DeleteAthletesGroupService {
  public async execute({ id }: IRequest): Promise<void> {
    const athletesGroupRepositories = getCustomRepository(AthletesGroupRepositories);

    const athletesGroup = await athletesGroupRepositories.findOne(id);

    if (!athletesGroup) {
      throw new AppError('Athletes Group not found', 404);
    }

    await athletesGroupRepositories.remove(athletesGroup);
  }
}

export default DeleteAthletesGroupService;
