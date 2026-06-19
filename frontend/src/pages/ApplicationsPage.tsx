import type { Application } from '../types/application';
import ApplicationCard from '../components/ApplicationCard';

const applications: Application[] = [
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
];

function ApplicationsPage() {
  return (
    <div>
      <h1>Applications</h1>

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