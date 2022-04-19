import { EntityRepository, Repository } from 'typeorm';
import Planning from '../entities/Planning';

@EntityRepository(Planning)
class PlanningRepositories extends Repository<Planning> {
  public async findById(id: string): Promise<Planning | undefined> {
    const planning = await this.findOne({
      where: { id },
    });

    return planning;
  }
}

export default PlanningRepositories;
