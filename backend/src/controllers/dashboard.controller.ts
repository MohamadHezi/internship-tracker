import { Request, Response } from 'express';
import { getDashboardData } from '../services/dashboard.service';

export async function getDashboard(
  request: Request,
  response: Response
) {
  const dashboard =
    await getDashboardData(
      request.user.userId
    );

  response.json(dashboard);
}