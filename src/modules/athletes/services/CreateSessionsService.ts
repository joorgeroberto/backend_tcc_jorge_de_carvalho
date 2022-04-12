import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Athlete from '../typeorm/entities/Athlete';
import AthletesRepositories from '../typeorm/repositories/AthletesRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  athlete: Omit<Athlete, 'password'>;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const athletesRepositories = getCustomRepository(AthletesRepositories);

    const _athlete = await athletesRepositories.findByEmailWithPassword(email);
    if (!_athlete) {
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordConfirmed = await compare(password, _athlete.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: _athlete.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const { password: _, ...athlete } = _athlete;

    return {
      athlete,
      token,
    };
  }
}

export default CreateSessionsService;
