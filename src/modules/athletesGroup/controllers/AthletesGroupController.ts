import { Request, Response } from 'express';
import ListAthletesGroupService from '../services/ListAthletesGroupService';
import CreateAthletesGroupService from '../services/CreateAthletesGroupService';
import DeleteAthletesGroupService from '../services/DeleteAthletesGroupService';

export default class AthletesGroupController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAthletesGroupService = new ListAthletesGroupService();
    const listsGroup = await listAthletesGroupService.execute();

    return response.json(listsGroup);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { group_name, athletes_quantity, sport_name, image, advisor_name, advisor_id } =
      request.body;

    const createAthletesGroup = new CreateAthletesGroupService();
    const athletesGroup = await createAthletesGroup.execute({
      advisor_name,
      advisor_id,
      group_name,
      athletes_quantity,
      sport_name,
    });

    return response.json(athletesGroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAthletesGroup = new DeleteAthletesGroupService();
    await deleteAthletesGroup.execute({ id });

    return response.json([]);
  }
}
