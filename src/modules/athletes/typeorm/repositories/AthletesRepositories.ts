import { EntityRepository, Repository } from "typeorm";
import Athlete from "../entities/Athlete";

@EntityRepository(Athlete)
class AthletesRepositories extends Repository<Athlete> {
  public async findByName(name: string): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: { name }
    })

    return athlete;
  }

  public async findByEmailAndPhone(email: string, phone: number): Promise<Athlete | undefined> {
    const athlete = this.findOne({
      where: { email, phone }
    })

    return athlete;
  }
}

export default AthletesRepositories;
