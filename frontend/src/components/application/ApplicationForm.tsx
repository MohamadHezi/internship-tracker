import { useState } from 'react';

interface ApplicationFormData {
  company: string;
  position: string;
  status: string;
  location: string;
  salary: string;
  notes: string;
  jobUrl: string;
}

interface ApplicationFormProps {
  onAddApplication: (
    application: ApplicationFormData
  ) => void;
}

function ApplicationForm({ onAddApplication }: ApplicationFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [notes, setNotes] = useState('');
  const [jobUrl, setJobUrl] = useState('');

function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  if (!company.trim() || !position.trim()) return;
  onAddApplication({
    company,
    position,
    status,
    location,
    salary,
    notes,
    jobUrl,
  });
  setCompany('');
  setPosition('');
  setStatus('Applied');
  setLocation('');
  setSalary('');
  setNotes('');
  setJobUrl('');
}

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Quick Add Application
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Save a new internship application and keep everything organized.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
            Position / Role
          </label>
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
            Location
          </label>

          <input
            type="text"
            placeholder="e.g. Ottawa, ON"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
            Salary
          </label>

          <input
            type="text"
            placeholder="e.g. $35/hr"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
            Job URL
          </label>

          <input
            type="url"
            placeholder="https://..."
            value={jobUrl}
            onChange={(event) => setJobUrl(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-3">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 pl-1">
            Notes
          </label>

          <textarea
            rows={4}
            placeholder="Add any notes about this application..."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none"
          />
        </div>

        <div className="md:col-span-2 xl:col-span-3 flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md cursor-pointer"
          >
            + Add Application
          </button>
        </div>
      </div>
    </form>
  );
}

export default ApplicationForm;