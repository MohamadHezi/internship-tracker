import type { Application } from '../types/application';
import ApplicationCard from '../components/ApplicationCard';
import { useState } from 'react';

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

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

function handleAddApplication() {
  const newApplication: Application = {
    id: applications.length + 1,
    company: company,
    position: position,
    status: 'Applied',
    dateApplied: '2026-06-19',
  };

  setApplications([...applications, newApplication]);

  setCompany('');
  setPosition('');
}

  return (
    <div>
      <h1>Applications</h1>

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
        />

        <button onClick={handleAddApplication}>
          Add Application
        </button>

      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
        />
      ))}
    </div>
  );
}

export default ApplicationsPage;