import { Request, Response } from 'express';
import CreatePlanningService from '../services/CreatePlanningService';
import ListAthletePlanningsService from '../services/ListAthletePlanningsService';
import DeletePlanningService from '../services/DeletePlanningService';
import CreatePerformedTrainingService from '../services/CreatePerformedTrainingService';

export default class PerformedTrainingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { calories, duration, distance, vMed, vMax, fcRest, fcMed, fcMax, trainingId } =
      request.body;

    const createPerformedTraining = new CreatePerformedTrainingService();
    const performedTraining = await createPerformedTraining.execute({
      calories,
      duration,
      distance,
      vMed,
      vMax,
      fcRest,
      fcMed,
      fcMax,
      trainingId,
    });

    return response.json(performedTraining);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id: trainingId } = request.params;

  //   const deletePlanning = new DeletePlanningService();
  //   await deletePlanning.execute({ trainingId });

  //   return response.json([]);
  // }
}
