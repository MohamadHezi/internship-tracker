import { useState } from 'react';
import type { Application } from '../types/application';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationForm from '../components/ApplicationForm';

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineering Intern',
      status: 'Applied',
      dateApplied: '2026-06-15',
    },
    {
      id: 2,
      company: 'Shopify',
      position: 'Backend Developer Intern',
      status: 'Interview',
      dateApplied: '2026-06-10',
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'SDE Intern',
      status: 'OA',
      dateApplied: '2026-06-12',
    },
  ]);

  function handleAddApplication(
    company: string,
    position: string
  ) {
    const newApplication: Application = {
      id: applications.length + 1,
      company,
      position,
      status: 'Applied',
      dateApplied: '2026-06-19',
    };

    setApplications([...applications, newApplication,]);
  }

  function handleDeleteApplication(id: number) {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );

    setApplications(updatedApplications);
  }
  
  function handleUpdateApplication(
    id: number,
    company: string,
    position: string
  ) {
    const updatedApplications =
      applications.map((application) => {
        if (application.id === id) {
          return {
            ...application,
            company,
            position,
          };
        }

        return application;
      });

    setApplications(updatedApplications);
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