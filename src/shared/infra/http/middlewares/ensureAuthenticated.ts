import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { AppError } from '@shared/error/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as ITokenPayload;

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
