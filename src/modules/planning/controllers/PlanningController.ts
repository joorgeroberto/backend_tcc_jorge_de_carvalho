import { Request, Response } from 'express';
import CreatePlanningService from '../services/CreatePlanningService';
import ListPlanningsService from '../services/ListPlanningsService';
import DeletePlanningService from '../services/DeletePlanningService';

export default class PlanningController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAthleteService = new ListPlanningsService();
    const listAthletes = await listAthleteService.execute();

    return response.json(listAthletes);
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
