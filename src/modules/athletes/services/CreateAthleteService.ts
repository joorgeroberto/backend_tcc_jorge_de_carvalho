import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';

interface IRequest {
  name: string;
  user_type: number;
  password: string;
  email: string;
  phone: number;
  birthdate: string;
  gender: string;
}

class CreateAthleteService {
  public async execute({
    name,
    user_type,
    password,
    email,
    phone,
    birthdate,
    gender,
  }: IRequest): Promise<Athlete> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);
    const athleteExists = await athletesRepositories.findByEmailAndPhone(email, phone);

    if (athleteExists) {
      throw new AppError('There is already one athlete with this email or phone.', 409);
    }

    const athlete = athletesRepositories.create({
      name,
      user_type,
      password,
      email,
      phone,
      birthdate,
      gender,
    });

    await athletesRepositories.save(athlete);

    return athlete;
  }
}

export default CreateAthleteService;
