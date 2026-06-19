import type { Application } from '../types/application';

interface ApplicationCardProps {
  application: Application;
}

function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div>
      <h3>{application.company}</h3>

      <p>{application.position}</p>

      <p>Status: {application.status}</p>

      <p>Applied: {application.dateApplied}</p>
    </div>
  );
}

export default ApplicationCard;