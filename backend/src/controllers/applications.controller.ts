import { Request, Response } from 'express';
import { getAllApplications, createApplication, deleteApplication, updateApplication, getApplicationById, uploadResume as uploadResumeService, } from '../services/applications.service';

export async function getApplications(request: Request, response: Response) {
  
  const applications =
    await getAllApplications(
      request.user.userId
    );
  
  response.json(applications);
}

// Add the async keyword to the controller definition
export async function postApplication(request: Request, response: Response) {
  const {
    company,
    position,
    status,
    location,
    salary,
    notes,
    job_url,
  } = request.body;

  if (!company || !position) {
    return response.status(400).json({
      message: 'Company and position are required',
    });
  }

  const application = await createApplication(
  company,
  position,
  status,
  location,
  salary,
  notes,
  job_url,
  request.user.userId
);

  return response.status(201).json(application);
}

export async function getApplication(request: Request, response: Response) {
  const id = Number(request.params.id);

  const application = await getApplicationById(
    id,
    request.user.userId
  );

  if (!application) {
    return response.status(404).json({
      message: 'Application not found',
    });
  }

  response.json(application);
}

export async function removeApplication(request: Request, response: Response) {
  const id = Number(request.params.id);

  const deleted = await deleteApplication(
    id,
    request.user.userId
  );

  if (!deleted) {
    return response.status(404).json({
      message: 'Application not found',
    });
  }

  return response.status(204).send();
}

export async function editApplication(
  request: Request,
  response: Response
) {
  console.log(request.body);

  const id = Number(request.params.id);

  const {
    company,
    position,
    status,
    location,
    salary,
    notes,
    job_url,
  } = request.body;

  const updatedApplication =
    await updateApplication(
      id,
      company,
      position,
      status,
      location,
      salary,
      notes,
      job_url,
      request.user.userId
    );

  if (!updatedApplication) {
    return response.status(404).json({
      message: 'Application not found',
    });
  }

  return response.json(updatedApplication);
}

export async function uploadResume(
  request: Request,
  response: Response
) {
  if (!request.file) {
    return response.status(400).json({
      message: 'No file uploaded',
    });
  }

  const applicationId = Number(
    request.params.id
  );

  const updatedApplication =
    await uploadResumeService(
      applicationId,
      request.user.userId,
      request.file.filename
    );

  if (!updatedApplication) {
    return response.status(404).json({
      message: 'Application not found',
    });
  }

  return response.json(updatedApplication);
}