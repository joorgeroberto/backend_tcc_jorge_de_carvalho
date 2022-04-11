import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';
import { hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
}

class UpdateAthleteService {
  public async execute({
    id,
    name,
    password,
    email,
    phone,
    birthdate,
    gender,
  }: IRequest): Promise<Athlete> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);
    let athlete = await athletesRepositories.findOne(id);

    if (!athlete) {
      throw new AppError('Athlete not found.');
    }

    const foundAthleteHasDiferentEmail = athlete?.email !== email;
    if (foundAthleteHasDiferentEmail) {
      const athleteWithEmail = await athletesRepositories.findByEmail(email);
      if (athleteWithEmail)
        throw new AppError('There is already one athlete with this email or phone.');
    }

    const foundAthleteHasDiferentPhone = athlete?.phone !== phone;

    if (foundAthleteHasDiferentPhone) {
      const athleteWithPhone = await athletesRepositories.findByPhone(phone);
      if (athleteWithPhone) {
        throw new AppError('There is already one athlete with this email or phone.');
      }
    }

    const hashedPassword = await hash(password, 8);

    athlete.name = name;
    athlete.password = hashedPassword;
    athlete.email = email;
    athlete.phone = phone;
    athlete.birthdate = birthdate;
    athlete.gender = gender;

    await athletesRepositories.update(id, athlete);

    athlete = { ...athlete, password: '' };

    return athlete;
  }
}

export default UpdateAthleteService;
