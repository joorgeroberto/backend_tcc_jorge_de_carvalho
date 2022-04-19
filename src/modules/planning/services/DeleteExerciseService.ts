import AthletesRepositories from '@modules/athletes/typeorm/repositories/AthletesRepositories';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ExerciseRepositories from '../typeorm/repositories/ExerciseRepositories';

interface IRequest {
  exerciseId: string;
  advisorId: string;
}

class DeleteExerciseService {
  public async execute({ exerciseId, advisorId }: IRequest): Promise<void> {
    const exerciseRepositories = getCustomRepository(ExerciseRepositories);

    const exercise = await exerciseRepositories.findById(exerciseId);

    if (!exercise) {
      throw new AppError('Exercise not found', 404);
    }

    const athletesRepositories = getCustomRepository(AthletesRepositories);
    const advisor = await athletesRepositories.findById(advisorId);
    const isAdvisor = advisor?.user_type === 'advisor';

    if (!isAdvisor) {
      throw new AppError(
        'Only Advisors can delete Exercises. Please, try again with other user.',
        403,
      );
    }

    await exerciseRepositories.remove(exercise);
  }
}

export default DeleteExerciseService;
