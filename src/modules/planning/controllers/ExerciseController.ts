import { Request, Response } from 'express';
import ListExercisesService from '../services/ListExercisesService';
import DeleteExerciseService from '../services/DeleteExerciseService';

export default class ExerciseController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listExercisesService = new ListExercisesService();
    const ListExercises = await listExercisesService.execute();

    return response.json(ListExercises);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: exerciseId } = request.params;
    const { id: advisorId } = request.athlete;

    const deleteExercise = new DeleteExerciseService();
    await deleteExercise.execute({ exerciseId, advisorId });

    return response.json([]);
  }
}
