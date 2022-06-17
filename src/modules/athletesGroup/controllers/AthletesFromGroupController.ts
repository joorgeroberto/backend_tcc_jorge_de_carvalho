import { Request, Response } from 'express';
import ListAthletesFromGroupService from '../services/ListAthletesFromGroupService';

export default class AthletesFromGroupController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.athlete;

    const listAthletesFromGroupService = new ListAthletesFromGroupService();
    const athletesList = await listAthletesFromGroupService.execute({ athleteId: id });

    return response.json(athletesList);
  }
}
