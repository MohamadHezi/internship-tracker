import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplication, uploadResume, updateApplication, deleteApplication} from '../services/applicationService';
import type { Application } from '../types/application';
import Section from '../components/ui/Section';
import DetailRow from '../components/ui/DetailRow';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

function ApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Consolidated Form Object State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Application | null>(null);

  useEffect(() => {
    async function loadApplication() {
      if (!id) return;
      try {
        const data = await getApplication(Number(id));
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application details:", error);
      }
    }
    loadApplication();
  }, [id]);

  // Hydrate Form Data copy
  useEffect(() => {
    if (application) {
      setFormData(application);
    }
  }, [application]);

  // Type-safe Field Update Helper
  function updateField(field: keyof Application, value: string) {
    if (!formData) return;
    setFormData({
      ...formData,
      [field]: value === '' ? null : value, // Keep empty fields stored as null
    });
  }

  async function handleUploadResume() {
    if (!selectedFile || !application) return;
    try {
      const updatedApplication = await uploadResume(application.id, selectedFile);
      setApplication(updatedApplication);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  }

  async function handleSaveChanges() {
    if (!application || !formData) {
      return;
    }

    try {
      const updatedApplication =
        await updateApplication(
          application.id,
          formData.company,
          formData.position,
          formData.status ?? 'Applied',
          formData.location ?? '',
          formData.salary ?? '',
          formData.notes ?? '',
          formData.jobUrl ?? ''
        );

      setApplication(updatedApplication);
      setFormData(updatedApplication);

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    if (!application) {
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplication(application.id);

      navigate('/applications');
    } catch (error) {
      console.error(error);
    }
  }

  if (!application || !formData) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium animate-pulse">
        Loading details...
      </div>
    );
  }

  // ==================== EDIT MODE FORM VIEW ====================
  if (isEditing) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Application</h1>
          <p className="text-sm text-gray-500 mt-1">Update tracking values for your pipeline record.</p>
        </div>

        <div className="space-y-6">
          <Section title="📋 Core Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Company Name</label>
                <Input value={formData.company} onChange={(e) => updateField('company', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Position</label>
                <Input value={formData.position} onChange={(e) => updateField('position', e.target.value)} />
              </div>
            </div>
          </Section>

          <Section title="📋 Application Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status Progress</label>
                <select
                  value={formData.status || 'Applied'}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
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
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                <Input value={formData.location ?? ''} onChange={(e) => updateField('location', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Salary Rate</label>
                <Input value={formData.salary ?? ''} onChange={(e) => updateField('salary', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date Applied</label>
                <Input type="date" value={formData.dateApplied ?? ''} onChange={(e) => updateField('dateApplied', e.target.value)} />
              </div>
            </div>
          </Section>

          <Section title="👤 Recruiter">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recruiter Name</label>
                <Input value={formData.recruiterName ?? ''} onChange={(e) => updateField('recruiterName', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recruiter Email</label>
                <Input type="email" value={formData.recruiterEmail ?? ''} onChange={(e) => updateField('recruiterEmail', e.target.value)} />
              </div>
            </div>
          </Section>

          <Section title="📅 Interview">
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Interview Date</label>
                <Input value={formData.interviewDate ?? ''} onChange={(e) => updateField('interviewDate', e.target.value)} />
              </div>
            </div>
          </Section>

          <Section title="📝 Notes">
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tracking Context Notes</label>
              <textarea
                rows={4}
                value={formData.notes ?? ''}
                onChange={(e) => updateField('notes', e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y"
              />
            </div>
          </Section>

          <Section title="🔗 Job Posting">
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">External Job Post URL</label>
                <Input value={formData.jobUrl ?? ''} onChange={(e) => updateField('jobUrl', e.target.value)} />
              </div>
            </div>
          </Section>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button 
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              setFormData(application); // Rollback changes
            }}
          >
            Cancel
          </button>
          
          <button 
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  // ==================== DEFAULT READ-ONLY STANDARD VIEW ====================
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <button
        onClick={() => navigate('/applications')}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors cursor-pointer group mb-2"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> 
        Back to Applications
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{application.company}</h1>
          <p className="text-lg font-medium text-gray-500 mt-1">{application.position}</p>
        </div>
        <div className="self-start sm:self-center">
          <Badge color="blue">
            {application.status || 'Applied'}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        <Section title="📋 Application Information">
          <div className="divide-y divide-gray-100">
            <DetailRow label="Status" value={application.status || 'Applied'} />
            <DetailRow label="Location" value={application.location ?? '—'} />
            <DetailRow label="Salary" value={application.salary ? <span className="font-mono">{application.salary}</span> : '—'} />
            <DetailRow label="Applied" value={application.dateApplied ?? '—'} />
          </div>
        </Section>

        <Section title="👤 Recruiter">
          <div className="divide-y divide-gray-100">
            <DetailRow label="Name" value={application.recruiterName ?? '—'} />
            <DetailRow 
              label="Email" 
              value={
                application.recruiterEmail ? (
                  <a href={`mailto:${application.recruiterEmail}`} className="text-blue-600 hover:underline">
                    {application.recruiterEmail}
                  </a>
                ) : (
                  '—'
                )
              } 
            />
          </div>
        </Section>

        <Section title="📅 Interview">
          <div className="divide-y divide-gray-100">
            <DetailRow label="Interview Date" value={application.interviewDate ?? '—'} />
          </div>
        </Section>

        <Section title="📝 Notes">
          <div className="text-sm text-gray-700 bg-gray-50/50 rounded-xl p-4 border border-gray-100 leading-relaxed whitespace-pre-wrap">
            {application.notes ?? 'No notes yet.'}
          </div>
        </Section>

        <Section title="📄 Resume">
          {application.resumePath ? (
            <div className="mb-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="font-semibold text-gray-700">Resume Uploaded</p>
                    <p className="text-xs text-gray-400 font-mono truncate max-w-xs">{application.resumePath}</p>
                  </div>
                </div>
                <a
                  href={`http://localhost:3000/uploads/${application.resumePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  View Resume
                </a>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic mb-4">No Resume Uploaded</p>
          )}

          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="file"
              accept=".pdf"
              onChange={(event) => {
                if (event.target.files) {
                  setSelectedFile(event.target.files[0]);
                }
              }}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
            />
            <button 
              onClick={handleUploadResume}
              disabled={!selectedFile}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Upload Resume
            </button>
          </div>
        </Section>

        <Section title="🔗 Job Posting">
          <div className="text-sm">
            {application.jobUrl ? (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-700 hover:underline break-all"
              >
                View Job Posting ↗
              </a>
            ) : (
              <span className="text-gray-400 italic">No job posting available.</span>
            )}
          </div>
        </Section>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button 
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate('/applications')}
          >
            Back
          </button>
          <button 
            type="button"
            onClick={handleDelete}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
          >
            Delete
          </button>
          <button 
            type="button"
            className="w-full sm:w-auto order-first sm:order-last px-5 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetailsPage;