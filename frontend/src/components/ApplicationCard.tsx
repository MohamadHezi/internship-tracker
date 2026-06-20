import type { Application } from '../types/application';
import { useState } from 'react';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    company: string,
    position: string
  ) => void;
}

function ApplicationCard({ application, onDelete, onUpdate }: ApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(application.company);
  const [editedPosition, setEditedPosition] = useState(application.position);

  function handleSave() {
    if (!editedCompany || !editedPosition) {
        return;
    }

    onUpdate(
        application.id,
        editedCompany,
        editedPosition
    );

    setIsEditing(false);
   }

  if (isEditing) {
    return (
        <div>
        <input
            type="text"
            value={editedCompany}
            onChange={(event) => setEditedCompany(event.target.value)}
        />

        <input
            type="text"
            value={editedPosition}
            onChange={(event) => setEditedPosition(event.target.value)}
        />

        <button onClick={handleSave}>
            Save
        </button>

        <button
            onClick={() => {
                setEditedCompany(application.company);
                setEditedPosition(application.position);
                setIsEditing(false);
            }}
        >
            Cancel
        </button>
        </div>
    );
    }

  return (
    <div>
      <h3>{application.company}</h3>
      <p>{application.position}</p>
      <p>Status: {application.status}</p>
      <p>Applied: {application.dateApplied}</p>

        <button
            onClick={() => onDelete(application.id)}
        >
            Delete
        </button>

        <button
            onClick={() => setIsEditing(true)}
        >
            Edit
        </button>
    </div>
  );
}

export default ApplicationCard;