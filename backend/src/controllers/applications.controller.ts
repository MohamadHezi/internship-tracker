import { Request, Response } from 'express';
import { getAllApplications, createApplication, deleteApplication, updateApplication } from '../services/applications.service';

export function getApplications(request: Request, response: Response) {
  const applications = getAllApplications();
  response.json(applications);
}

export function postApplication(request: Request, response: Response) {
  const { company, position } = request.body;

  if (!company || !position) {
    return response.status(400).json({
      message: 'Company and position are required',
    });
  }

  const application = createApplication(company, position);

  
  response.status(201).json(application);
}

export function removeApplication(request: Request, response: Response) {
  const id = Number(request.params.id);

  const deleted = deleteApplication(id);

  if (!deleted) {
    return response.status(404).json({ message: 'Application not found' });
  }

  response.status(204).send();
}

export function editApplication(
  request: Request,
  response: Response
) {
  const id = Number(
    request.params.id
  );

  const { company, position } =
    request.body;

  const updatedApplication =
    updateApplication(
      id,
      company,
      position
    );

  if (!updatedApplication) {
    return response
      .status(404)
      .json({
        message:
          'Application not found',
      });
  }

  response.json(updatedApplication);
}