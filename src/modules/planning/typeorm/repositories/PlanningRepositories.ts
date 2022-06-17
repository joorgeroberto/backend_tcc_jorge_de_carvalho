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

  public async findByAthleteId(athleteId: string): Promise<Planning[]> {
    const planning = await this.find({
      where: { athleteId },
      relations: [
        'trainings',
        'trainings.performedTraining',
        'trainings.exerciseGroups',
        'trainings.exerciseGroups.exercises',
      ],
      /*
      * Another way to do this select:

      join: {
        alias: 'planning',
        innerJoinAndSelect: {
          trainings: 'planning.trainings',
          exerciseGroups: 'trainings.exerciseGroups',
        },
      },*/
    });

    return planning;
  }
}

export default PlanningRepositories;
