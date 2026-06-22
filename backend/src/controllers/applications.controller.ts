import { Request, Response } from 'express';
import { getAllApplications, createApplication, deleteApplication, updateApplication } from '../services/applications.service';

export async function getApplications(request: Request, response: Response) {
  const applications = await getAllApplications();
  
  response.json(applications);
}

// Add the async keyword to the controller definition
export async function postApplication(request: Request, response: Response) {
  const { company, position } = request.body;

  if (!company || !position) {
    return response.status(400).json({
      message: 'Company and position are required',
    });
  }

  const application = await createApplication(company, position);

  return response.status(201).json(application);
}

export async function removeApplication(request: Request, response: Response) {
  const id = Number(request.params.id);

  const deleted = await deleteApplication(id);

  if (!deleted) {
    return response.status(404).json({
      message: 'Application not found',
    });
  }

  return response.status(204).send();
}

export async function editApplication(request: Request, response: Response) {
  const id = Number(request.params.id);
  const { company, position } = request.body;

  const updatedApplication = await updateApplication(id, company, position);

  if (!updatedApplication) {
    return response.status(404).json({
      message: 'Application not found',
    });
  }

  return response.json(updatedApplication);
}