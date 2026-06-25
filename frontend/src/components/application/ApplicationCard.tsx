import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types/application';
import { useState } from 'react';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: number) => void;
  onUpdate: (id: number, company: string, position: string) => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Applied':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Interview':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Offer':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function ApplicationCard({ application, onDelete, onUpdate }: ApplicationCardProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(application.company);
  const [editedPosition, setEditedPosition] = useState(application.position);

  function handleSave() {
    if (!editedCompany.trim() || !editedPosition.trim()) {
      return;
    }

    onUpdate(application.id, editedCompany, editedPosition);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="rounded-xl border border-blue-300 bg-blue-50/30 p-6 shadow-xs transition-all">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Edit Company</label>
            <input
              type="text"
              value={editedCompany}
              onChange={(event) => setEditedCompany(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Edit Position</label>
            <input
              type="text"
              value={editedPosition}
              onChange={(event) => setEditedPosition(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 cursor-pointer"
            >
              Save
            </button>
            <button 
              onClick={() => {
                setEditedCompany(application.company);
                setEditedPosition(application.position);
                setIsEditing(false);
              }}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:border-gray-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 
          onClick={() => navigate(`/applications/${application.id}`)}
          className="text-xl font-bold text-gray-900 tracking-tight cursor-pointer hover:text-blue-600 transition-colors inline-block"
        >
          {application.company}
        </h3>
        <p className="text-sm font-medium text-gray-500 mt-0.5">{application.position}</p>
        {application.dateApplied && (
          <p className="text-xs text-gray-400 mt-2">Applied on: {application.dateApplied}</p>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusColor(application.status || 'Applied')}`}>
          {application.status || 'Applied'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="rounded-lg bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 text-xs font-medium hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;