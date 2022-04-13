import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';

interface IRequest {
  name: string;
  user_type: string;
  password: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  group_id: string;
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
    group_id,
  }: IRequest): Promise<Athlete> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);
    const athleteWithEmailExists = await athletesRepositories.findByEmail(email);
    const athleteWithPhoneExists = await athletesRepositories.findByPhone(phone);

    const athleteExists = athleteWithEmailExists || athleteWithPhoneExists;
    if (athleteExists) {
      throw new AppError('There is already one athlete with this email or phone.', 409);
    }

    const hashedPassword = await hash(password, 8);

    const athlete = athletesRepositories.create({
      name,
      user_type,
      password: hashedPassword,
      email,
      phone,
      birthdate,
      gender,
      group_id,
    });

    await athletesRepositories.save(athlete);

    return athlete;
  }
}

export default CreateAthleteService;
