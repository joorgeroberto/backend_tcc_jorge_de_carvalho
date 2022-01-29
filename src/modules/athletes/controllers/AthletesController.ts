import { Request, Response } from "express";
import CreateAthleteService from "../services/CreateAthleteService";
import DeleteAthleteService from "../services/DeleteAthleteService";

export default class AthletesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name,
      user_type,
      password,
      email,
      phone,
      birthdate,
      gender } = request.body;

    const createAthlete = new CreateAthleteService();
    const athlete = await createAthlete.execute({ name,
      user_type,
      password,
      email,
      phone,
      birthdate,
      gender });


    return response.json(athlete)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAthlete = new DeleteAthleteService();
    await deleteAthlete.execute({ id });

    return response.json([]);
  }
}
