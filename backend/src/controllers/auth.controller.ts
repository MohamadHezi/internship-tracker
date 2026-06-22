import { Request, Response } from 'express';
import { 
  createUser, 
  findUserByEmail, 
  verifyPassword, 
  generateToken 
} from '../services/auth.service';


export async function register(request: Request, response: Response) {
  const { email, password } = request.body;

  const user = await createUser(email, password);

  response.status(201).json(user);
}

export async function login(request: Request, response: Response) {
  const { email, password } = request.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return response.status(401).json({
      message: 'Invalid credentials',
    });
  }

  const passwordValid = await verifyPassword(password, user.password_hash);

  if (!passwordValid) {
    return response.status(401).json({
      message: 'Invalid credentials',
    });
  }

  const token = generateToken(user.id);

  return response.json({
    token,
  });
}