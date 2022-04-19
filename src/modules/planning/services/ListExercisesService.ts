import { getCustomRepository } from 'typeorm';
import Exercise from '../typeorm/entities/Exercise';
import ExerciseRepositories from '../typeorm/repositories/ExerciseRepositories';

class ListExercisesService {
  public async execute(): Promise<Exercise[]> {
    const exerciseRepositories = getCustomRepository(ExerciseRepositories);

    const exercises = await exerciseRepositories.find();

    return exercises;
  }
}

export default ListExercisesService;
