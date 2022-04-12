import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number; // timestamp de quando o token foi criado
  exp: number; // timestamp de quando o token irá expirar
  sub: string; // athleteID
}

export default function isAutheticated(request: Request, _: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  // Desestruturando token com a estrutura:
  // Bearer "token"
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.athlete = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.', 401);
  }
}
