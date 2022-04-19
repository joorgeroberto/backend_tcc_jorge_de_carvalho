import { EntityRepository, Repository } from 'typeorm';
import Exercise from '../entities/Exercise';

@EntityRepository(Exercise)
class ExerciseRepositories extends Repository<Exercise> {
  public async findById(id: string): Promise<Exercise | undefined> {
    const exercise = await this.findOne({
      where: { id },
    });

    return exercise;
  }
}

export default ExerciseRepositories;
