import { EntityRepository, Repository } from 'typeorm';
import Athlete from '../entities/Athlete';

@EntityRepository(Athlete)
class AthletesRepositories extends Repository<Athlete> {
  public async findByIdWithPassword(id: string): Promise<Athlete | undefined> {
    return this.createQueryBuilder('athletes')
      .addSelect('athletes.password')
      .where(`athletes.id = :id`, { id: id })
      .getOne();
  }

  public async findById(id: string): Promise<Athlete | undefined> {
    const athlete = await this.findOne({
      where: { id },
    });

    return athlete;
  }

  public async findByGroupId(groupId: string): Promise<Athlete[]> {
    const athlete = await this.find({
      where: { group_id: groupId },
    });

    return athlete || [];
  }

  public async findByName(name: string): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: { name },
    });

    return athlete;
  }

  public async findByEmailWithPassword(email: string): Promise<Athlete | undefined> {
    return this.createQueryBuilder()
      .addSelect('Athlete.password')
      .where(`"email" ILIKE '${email}'`)
      .getOne();
  }

  public async findByEmail(email: string): Promise<Athlete | undefined> {
    // Without Password for default
    const athlete = this.findOne({
      where: `"email" ILIKE '${email}'`,
    });

    return athlete;
  }

  public async findByPhone(phone: string): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: { phone: phone.replace(/[^0-9]/g, '') },
    });

    return athlete;
  }
}

export default AthletesRepositories;
