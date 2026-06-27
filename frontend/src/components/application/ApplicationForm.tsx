import { useState } from 'react';
import Button from '../ui/Button';

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
  onAddApplication: (application: ApplicationFormData) => void;
}

const inputClass =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400';
const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-400';

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
    onAddApplication({ company, position, status, location, salary, notes, jobUrl });
    setCompany('');
    setPosition('');
    setStatus('Applied');
    setLocation('');
    setSalary('');
    setNotes('');
    setJobUrl('');
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-100 bg-white p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-neutral-900">Add Application</h2>
        <p className="mt-0.5 text-xs text-neutral-400">Log a new internship to your pipeline.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className={labelClass}>Company</label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Position</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option>Interested</option>
            <option>Applied</option>
            <option>OA</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            placeholder="e.g. Ottawa, ON"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Salary</label>
          <input
            type="text"
            placeholder="e.g. $35/hr"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Job URL</label>
          <input
            type="url"
            placeholder="https://..."
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2 xl:col-span-3">
          <label className={labelClass}>Notes</label>
          <textarea
            rows={3}
            placeholder="Add any notes about this application..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="md:col-span-2 xl:col-span-3 flex justify-end">
          <Button type="submit" className="px-5">
            Add Application
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ApplicationForm;
