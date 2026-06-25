import { useEffect, useState } from 'react';
import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication as updateApplicationApi,
} from '../services/applicationService';
import type { Application } from '../types/application';
import ApplicationCard from '../components/application/ApplicationCard';
import ApplicationForm from '../components/application/ApplicationForm';

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
      } catch (err) {
        setError('Could not load application data records.');
      }
    }
    loadApplications();
  }, []);

  async function handleAddApplication(company: string, position: string) {
    try {
      const application = await createApplication(company, position);
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

  async function handleUpdateApplication(id: number, company: string, position: string) {
    try {
      const updatedApplication = await updateApplicationApi(id, company, position);
      setApplications(applications.map((app) => (app.id === id ? updatedApplication : app)));
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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Applications</h1>
        <p className="mt-2 text-sm text-gray-500">Monitor interview processes and track submissions.</p>
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <ApplicationForm onAddApplication={handleAddApplication} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
        <input
          type="text"
          placeholder="Search by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-hidden shadow-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-hidden cursor-pointer shadow-xs"
        >
          <option value="All">All Stages / Statuses</option>
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
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:outline-hidden cursor-pointer shadow-xs"
        >
          <option value="Newest">Date: Newest to Oldest</option>
          <option value="Oldest">Date: Oldest to Newest</option>
          <option value="Company A-Z">Alphabetical: A to Z</option>
          <option value="Company Z-A">Alphabetical: Z to A</option>
        </select>
      </div>

      <div className="space-y-5">
        {filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
            <h2 className="text-lg font-semibold text-gray-900">No matching tracking entries found</h2>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your query text keywords or filters.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDelete={handleDeleteApplication}
              onUpdate={handleUpdateApplication}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ApplicationsPage;