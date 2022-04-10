import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';

interface IRequest {
  phone: string;
  password: string;
}

interface IResponse {
  athlete: Athlete;
  token: string;
}

class CreateSessionsService {
  public async execute({ phone, password }: IRequest): Promise<IResponse> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const athlete = await athletesRepositories.findByPhone(phone);
    if (!athlete) {
      throw new AppError('Incorrect phone or password', 401);
    }

    const passwordConfirmed = await compare(password, athlete.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect phone or password', 401);
    }

    const token = sign({}, 'a855b7f4c8733805c060872e053f5631', {
      subject: athlete.id,
      expiresIn: '1d', // token com validade de um dia
    });

    return {
      athlete,
      token,
    };
  }
}

export default CreateSessionsService;
