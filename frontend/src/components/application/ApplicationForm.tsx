import { useState } from 'react';

interface ApplicationFormProps {
  onAddApplication: (company: string, position: string) => void;
}

function ApplicationForm({ onAddApplication }: ApplicationFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  if (!company.trim() || !position.trim()) return;
  onAddApplication(company, position);
  setCompany('');
  setPosition('');
}

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 items-end">
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

        <button 
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
        >
          Add Application
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;