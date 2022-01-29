import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import AthletesRepositories from "../typeorm/repositories/AthletesRepositories";

interface IRequest {
  id: string;
}

class DeleteAthleteService {
  public async execute({id}: IRequest): Promise<void> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athlete = await athletesRepositories.findOne(id)

    if(!athlete) {
      throw new AppError('Athlete not found', 404);
    }

    await athletesRepositories.remove(athlete);
  }
}

export default DeleteAthleteService;
