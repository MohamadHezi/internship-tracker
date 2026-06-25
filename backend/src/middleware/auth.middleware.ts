import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token required',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({
      message: 'Invalid token format',
    });
  }
  
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: number };

    request.user = {
      userId: decoded.userId,
    };

    next();
  } catch {
    return response.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}