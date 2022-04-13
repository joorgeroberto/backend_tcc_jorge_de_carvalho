import { EntityRepository, Raw, Repository } from 'typeorm';
import AthletesGroup from '../entities/AthletesGroup';

@EntityRepository(AthletesGroup)
class AthletesGroupRepositories extends Repository<AthletesGroup> {
  public async findByName(name: string): Promise<AthletesGroup | undefined> {
    const athletesGroup = await this.findOne({
      where: `"name" ILIKE '${name}'`,
    });

    return athletesGroup;
  }

  public async findById(id: string): Promise<AthletesGroup | undefined> {
    const athletesGroup = await this.findOne({
      where: { id },
    });

    return athletesGroup;
  }

  public async findByAdvisorId(advisor_id: string): Promise<AthletesGroup | undefined> {
    const athletesGroup = await this.findOne({
      where: { advisor_id },
    });

    return athletesGroup;
  }
}

export default AthletesGroupRepositories;
