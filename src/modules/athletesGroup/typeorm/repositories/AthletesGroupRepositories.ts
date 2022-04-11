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
}

export default AthletesGroupRepositories;
