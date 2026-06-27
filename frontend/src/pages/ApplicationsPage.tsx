import { useEffect, useState } from 'react';
import {
  getApplications,
  createApplication,
  deleteApplication,
} from '../services/applicationService';
import type { Application } from '../types/application';
import ApplicationCard from '../components/application/ApplicationCard';
import ApplicationForm from '../components/application/ApplicationForm';

interface ApplicationFormData {
  company: string;
  position: string;
  status: string;
  location: string;
  salary: string;
  notes: string;
  jobUrl: string;
}

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    loadApplications();
  }, []);

  async function handleAddApplication(applicationData: ApplicationFormData) {
    try {
      const application = await createApplication(
        applicationData.company,
        applicationData.position,
        applicationData.status,
        applicationData.location,
        applicationData.salary,
        applicationData.notes,
        applicationData.jobUrl
      );
      setApplications([...applications, application]);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteApplication(id: number) {
    try {
      await deleteApplication(id);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const filteredApplications = [...applications].filter((application) => {
    const matchesSearch = application.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      application.status === statusFilter ||
      (statusFilter === 'OA' && application.status === 'OA (Online Assessment)');
    return matchesSearch && matchesStatus;
  });

  filteredApplications.sort((a, b) => {
    const timeA = a.dateApplied ? new Date(a.dateApplied).getTime() : 0;
    const timeB = b.dateApplied ? new Date(b.dateApplied).getTime() : 0;
    switch (sortBy) {
      case 'Company A-Z': return a.company.localeCompare(b.company);
      case 'Company Z-A': return b.company.localeCompare(a.company);
      case 'Oldest': return timeA - timeB;
      default: return timeB - timeA;
    }
  });

  const selectClass =
    'rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 cursor-pointer transition';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Applications</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage and track your internship pipeline.</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <ApplicationForm onAddApplication={handleAddApplication} />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
        >
          <option value="All">All Statuses</option>
          <option value="Interested">Interested</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA (Online Assessment)</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={selectClass}
        >
          <option value="Newest">Newest first</option>
          <option value="Oldest">Oldest first</option>
          <option value="Company A-Z">A → Z</option>
          <option value="Company Z-A">Z → A</option>
        </select>
      </div>

      {/* Application list */}
      <div className="space-y-3">
        {filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-200 p-12 text-center">
            <p className="text-sm font-medium text-neutral-700">No applications found</p>
            <p className="mt-1 text-xs text-neutral-400">Try adjusting your filters.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDelete={handleDeleteApplication}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ApplicationsPage;
