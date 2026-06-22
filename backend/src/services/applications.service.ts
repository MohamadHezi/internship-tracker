import { Application } from '../types/application';

const applications: Application[] = [
  {
    id: 1,
    company: 'Google',
    position: 'Software Engineering Intern',
    status: 'Applied',
  },
  {
    id: 2,
    company: 'Shopify',
    position: 'Backend Developer Intern',
    status: 'Interview',
  },
];

export function getAllApplications() {
  return applications;
}

export function createApplication(company: string, position: string) {
  const newApplication = {
    id: applications.length + 1,
    company,
    position,
    status: 'Applied',
  };

  applications.push(newApplication);
  return newApplication;
}

export function deleteApplication(
  id: number
) {
  const index = applications.findIndex(
    (application) =>
      application.id === id
  );

  if (index === -1) {
    return false;
  }

  applications.splice(index, 1);

  return true;
}

export function updateApplication(
  id: number,
  company: string,
  position: string
) {
  const application = applications.find(
    (application) => application.id === id
  );

  if (!application) {
    return null;
  }

  application.company = company;
  application.position = position;

  return application;
}