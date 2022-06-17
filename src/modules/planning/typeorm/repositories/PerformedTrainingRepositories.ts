import { EntityRepository, Repository } from 'typeorm';
import PerformedTraining from '../entities/PerformedTraining';

@EntityRepository(PerformedTraining)
class PerformedTrainingRepositories extends Repository<PerformedTraining> {
  public async findByTrainingId(trainingId: string): Promise<PerformedTraining | undefined> {
    const performedTraining = await this.findOne({
      where: { trainingId },
    });

    return performedTraining;
  }

  public async findById(id: string): Promise<PerformedTraining | undefined> {
    const performedTraining = await this.findOne({
      where: { id },
    });

    return performedTraining;
  }
}

export default PerformedTrainingRepositories;
