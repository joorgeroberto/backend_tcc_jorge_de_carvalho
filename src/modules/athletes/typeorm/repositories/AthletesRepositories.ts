import { EntityRepository, Repository } from 'typeorm';
import Athlete from '../entities/Athlete';

@EntityRepository(Athlete)
class AthletesRepositories extends Repository<Athlete> {
  public async findByName(name: string): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: { name },
    });

    return athlete;
  }

  public async findByEmail(email: string): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: `"email" ILIKE '${email}'`,
    });

    return athlete;
  }

  public async findByPhone(phone: string): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: { phone },
    });

    return athlete;
  }
}

export default AthletesRepositories;
