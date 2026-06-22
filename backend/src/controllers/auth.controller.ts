import { Request, Response } from 'express';
import { createUser } from '../services/auth.service';

import {
  hashPassword,
} from '../services/auth.service';

export async function register(request: Request, response: Response) {
  const { email, password } = request.body;

  const user = await createUser(email, password);

  response.status(201).json(user);
}