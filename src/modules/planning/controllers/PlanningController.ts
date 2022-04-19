import { Request, Response } from 'express';
import CreatePlanningService from '../services/CreatePlanningService';
import ListPlanningsService from '../services/ListPlanningsService';

export default class PlanningController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAthleteService = new ListPlanningsService();
    const listAthletes = await listAthleteService.execute();

    return response.json(listAthletes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, numberWeeks, startDate, endDate, athleteId, trainings } = request.body;

    const createPlanning = new CreatePlanningService();
    const planning = await createPlanning.execute({
      name,
      numberWeeks,
      startDate,
      endDate,
      athleteId,
      trainings,
    });

    return response.json(planning);

    // console.log(name, numberWeeks, startDate, endDate, athleteId, trainings);

    // return response.json('deu bom');
  }
}
