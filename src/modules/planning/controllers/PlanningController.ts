import { Request, Response } from 'express';
import CreatePlanningService from '../services/CreatePlanningService';
import ListAthletePlanningsService from '../services/ListAthletePlanningsService';
import DeletePlanningService from '../services/DeletePlanningService';

export default class PlanningController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: athleteId } = request.params;
    const listAthletePlanningsService = new ListAthletePlanningsService();
    const listAthletePlannings = await listAthletePlanningsService.execute({
      athleteId,
    });

    return response.json(listAthletePlannings);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: advisorId } = request.athlete;
    const { name, numberOfWeeks, startDate, endDate, athleteId, trainings } = request.body;

    const createPlanning = new CreatePlanningService();
    const planning = await createPlanning.execute({
      name,
      numberOfWeeks,
      startDate,
      endDate,
      advisorId,
      athleteId,
      trainings,
    });

    return response.json(planning);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: planningId } = request.params;
    const { id: advisorId } = request.athlete;

    const deletePlanning = new DeletePlanningService();
    await deletePlanning.execute({ planningId, advisorId });

    return response.json([]);
  }
}
