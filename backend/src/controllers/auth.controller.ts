import { Request, Response } from 'express';
import { 
  createUser, 
  findUserByEmail, 
  verifyPassword, 
  generateToken 
} from '../services/auth.service';


export async function register(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    const user = await createUser(email, password);
    response.status(201).json(user);
  } catch {
    response.status(500).json({ message: 'Registration failed.' });
  }
}

export async function login(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
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

    return response.json({ token });
  } catch {
    return response.status(500).json({ message: 'Login failed.' });
  }
}