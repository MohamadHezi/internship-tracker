import { useEffect, useState } from 'react';
import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication as updateApplicationApi,
} from '../services/applicationService';
import type { Application } from '../types/application';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationForm from '../components/ApplicationForm';

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
  async function loadApplications() {
    const data =
      await getApplications();

    setApplications(data);
  }

    loadApplications();
  }, []);

async function handleAddApplication(
  company: string,
  position: string
) {
  const application =
    await createApplication(
      company,
      position
    );

  setApplications([
    ...applications,
    application,
  ]);
}

  async function handleDeleteApplication(id: number) {
    await deleteApplication(id);

    setApplications(applications.filter((application) => application.id !== id));
  }
  
  async function handleUpdateApplication(
    id: number,
    company: string,
    position: string
  ) {
    const updatedApplication =
      await updateApplicationApi(
        id,
        company,
        position
      );

    setApplications(
      applications.map((application) =>
        application.id === id
          ? updatedApplication
          : application
      )
    );
  }

  return (
    <div>
      <h1>Applications</h1>

      <ApplicationForm
        onAddApplication={handleAddApplication}
      />

      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onDelete={handleDeleteApplication}
          onUpdate={handleUpdateApplication}
        />
      ))}
    </div>
  );
}

export default ApplicationsPage;