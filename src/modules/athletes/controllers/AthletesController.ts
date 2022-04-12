import { Request, Response } from 'express';
import CreateAthleteService from '../services/CreateAthleteService';
import DeleteAthleteService from '../services/DeleteAthleteService';
import ListAthleteService from '../services/ListAthleteService';
import UpdateAthleteService from '../services/UpdateAthleteService';

import CreateAthletesGroupService from '../../athletesGroup/services/CreateAthletesGroupService';

export default class AthletesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAthleteService = new ListAthleteService();
    const listAthletes = await listAthleteService.execute();

    return response.json(listAthletes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, user_type, password, email, phone, birthdate, gender, group_id } = request.body;

    const createAthlete = new CreateAthleteService();
    const athlete = await createAthlete.execute({
      name,
      user_type,
      password,
      email,
      phone: phone.replace(/[^0-9]/g, ''),
      birthdate,
      gender,
      group_id,
    });

    const isAdvisor = user_type === 'advisor';
    if (isAdvisor) {
      const { athletes_quantity, sport_name, group_name } = request.body;

      const createAthletesGroup = new CreateAthletesGroupService();
      const group = await createAthletesGroup.execute({
        athletes_quantity,
        sport_name,
        group_name,
      });

      const updateAthlete = new UpdateAthleteService();
      const athleteWithUpdatedGroup = await updateAthlete.execute({
        id: athlete.id,
        group_id: group.id,
      });

      return response.json(athleteWithUpdatedGroup);
    }

    return response.json(athlete);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { /*name, password, email, phone, birthdate, gender,*/ group_id } = request.body;

    const updateAthlete = new UpdateAthleteService();
    const athlete = await updateAthlete.execute({
      id,
      // name,
      // password,
      // email,
      // phone,
      // birthdate,
      // gender,
      group_id,
    });

    return response.json(athlete);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAthlete = new DeleteAthleteService();
    await deleteAthlete.execute({ id });

    return response.json([]);
  }
}
