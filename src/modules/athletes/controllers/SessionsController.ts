import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { phone, password } = request.body;

    const createSession = new CreateSessionsService();
    const athlete = await createSession.execute({
      phone,
      password,
    });

    return response.json(athlete);
  }
}
