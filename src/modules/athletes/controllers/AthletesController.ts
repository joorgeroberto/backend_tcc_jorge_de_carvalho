import { Request, Response } from 'express';
import CreateAthleteService from '../services/CreateAthleteService';
import DeleteAthleteService from '../services/DeleteAthleteService';
import ListAthleteService from '../services/ListAthleteService';
import UpdateAthleteService from '../services/UpdateAthleteService';

export default class AthletesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listAthleteService = new ListAthleteService();
    const listAthletes = await listAthleteService.execute();

    return response.json(listAthletes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, user_type, password, email, phone, birthdate, gender } = request.body;

    const createAthlete = new CreateAthleteService();
    const athlete = await createAthlete.execute({
      name,
      user_type,
      password,
      email,
      phone,
      birthdate,
      gender,
    });

    return response.json(athlete);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, password, email, phone, birthdate, gender } = request.body;

    const updateAthlete = new UpdateAthleteService();
    const athlete = await updateAthlete.execute({
      id,
      name,
      password,
      email,
      phone,
      birthdate,
      gender,
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
