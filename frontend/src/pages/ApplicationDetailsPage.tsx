import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getApplication,
  uploadResume,
  updateApplication,
  deleteApplication,
} from '../services/applicationService';
import type { Application } from '../types/application';
import Section from '../components/ui/Section';
import DetailRow from '../components/ui/DetailRow';
import Input from '../components/ui/Input';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import { formatDate } from '../utils/formatDate';

const selectClass =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 cursor-pointer';
const labelClass =
  'mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-400';
const textareaClass =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-3 text-sm text-neutral-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 resize-y';

function ApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Application | null>(null);

  useEffect(() => {
    async function loadApplication() {
      if (!id) return;
      try {
        const data = await getApplication(Number(id));
        setApplication(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    }
    loadApplication();
  }, [id]);

  function updateField(field: keyof Application, value: string) {
    if (!formData) return;
    setFormData({ ...formData, [field]: value === '' ? null : value });
  }

  async function handleUploadResume() {
    if (!selectedFile || !application) return;
    try {
      const updatedApplication = await uploadResume(application.id, selectedFile);
      setApplication(updatedApplication);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  }

  async function handleSaveChanges() {
    if (!application || !formData) return;
    try {
      const updatedApplication = await updateApplication(
        application.id,
        formData.company,
        formData.position,
        formData.status ?? 'Applied',
        formData.location ?? '',
        formData.salary ?? '',
        formData.notes ?? '',
        formData.jobUrl ?? '',
        formData.recruiterName ?? null,
        formData.recruiterEmail ?? null,
        formData.interviewDate ?? null,
        formData.dateApplied ?? null,
      );
      setApplication(updatedApplication);
      setFormData(updatedApplication);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    if (!application) return;
    const confirmed = window.confirm('Are you sure you want to delete this application?');
    if (!confirmed) return;
    try {
      await deleteApplication(application.id);
      navigate('/applications');
    } catch (error) {
      console.error(error);
    }
  }

  if (!application || !formData) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="animate-pulse text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  // ── Edit mode ──────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="border-b border-neutral-100 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Edit Application</h1>
          <p className="mt-1 text-sm text-neutral-500">Update details for this pipeline record.</p>
        </div>

        <Section title="Core Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Company Name</label>
              <Input value={formData.company} onChange={(e) => updateField('company', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Position</label>
              <Input value={formData.position} onChange={(e) => updateField('position', e.target.value)} />
            </div>
          </div>
        </Section>

        <Section title="Application Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={formData.status || 'Applied'}
                onChange={(e) => updateField('status', e.target.value)}
                className={selectClass}
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
              <Input value={formData.location ?? ''} onChange={(e) => updateField('location', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Salary</label>
              <Input value={formData.salary ?? ''} onChange={(e) => updateField('salary', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Date Applied</label>
              <Input
                type="date"
                value={(formData.dateApplied ?? '').slice(0, 10)}
                onChange={(e) => updateField('dateApplied', e.target.value)}
              />
            </div>
          </div>
        </Section>

        <Section title="Recruiter">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Recruiter Name</label>
              <Input
                value={formData.recruiterName ?? ''}
                onChange={(e) => updateField('recruiterName', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Recruiter Email</label>
              <Input
                type="email"
                value={formData.recruiterEmail ?? ''}
                onChange={(e) => updateField('recruiterEmail', e.target.value)}
              />
            </div>
          </div>
        </Section>

        <Section title="Interview">
          <div>
            <label className={labelClass}>Interview Date</label>
            <Input
              type="date"
              value={(formData.interviewDate ?? '').slice(0, 10)}
              onChange={(e) => updateField('interviewDate', e.target.value)}
            />
          </div>
        </Section>

        <Section title="Notes">
          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              rows={4}
              value={formData.notes ?? ''}
              onChange={(e) => updateField('notes', e.target.value)}
              className={textareaClass}
            />
          </div>
        </Section>

        <Section title="Job Posting">
          <div>
            <label className={labelClass}>Job URL</label>
            <Input value={formData.jobUrl ?? ''} onChange={(e) => updateField('jobUrl', e.target.value)} />
          </div>
        </Section>

        <div className="flex items-center justify-end gap-2.5 border-t border-neutral-100 pt-5">
          <Button
            variant="secondary"
            onClick={() => { setIsEditing(false); setFormData(application); }}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    );
  }

  // ── Read-only view ─────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button
        onClick={() => navigate('/applications')}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Applications
      </button>

      <div className="flex flex-col gap-3 border-b border-neutral-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{application.company}</h1>
          <p className="mt-1 text-base text-neutral-500">{application.position}</p>
        </div>
        <StatusBadge status={application.status || 'Applied'} />
      </div>

      <div className="space-y-4">
        <Section title="Application Information">
          <div className="divide-y divide-neutral-50">
            <DetailRow label="Status" value={application.status || 'Applied'} />
            <DetailRow label="Location" value={application.location ?? '—'} />
            <DetailRow label="Salary" value={application.salary ? <span className="font-mono">{application.salary}</span> : '—'} />
            <DetailRow label="Applied" value={formatDate(application.dateApplied)} />
          </div>
        </Section>

        <Section title="Recruiter">
          <div className="divide-y divide-neutral-50">
            <DetailRow label="Name" value={application.recruiterName ?? '—'} />
            <DetailRow
              label="Email"
              value={
                application.recruiterEmail ? (
                  <a href={`mailto:${application.recruiterEmail}`} className="text-blue-600 hover:underline">
                    {application.recruiterEmail}
                  </a>
                ) : '—'
              }
            />
          </div>
        </Section>

        <Section title="Interview">
          <div className="divide-y divide-neutral-50">
            <DetailRow label="Interview Date" value={application.interviewDate ?? '—'} />
          </div>
        </Section>

        <Section title="Notes">
          <div className="rounded-lg bg-neutral-50 px-4 py-3 text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap">
            {application.notes ?? <span className="text-neutral-400 italic">No notes yet.</span>}
          </div>
        </Section>

        <Section title="Resume">
          {application.resumePath ? (
            <div className="mb-4 flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-700">Resume uploaded</p>
                <p className="mt-0.5 truncate text-xs font-mono text-neutral-400">{application.resumePath}</p>
              </div>
              <a
                href={`http://localhost:3000/uploads/${application.resumePath}`}
                target="_blank"
                rel="noreferrer"
                className="ml-4 shrink-0 text-sm font-medium text-blue-600 hover:underline"
              >
                View
              </a>
            </div>
          ) : (
            <p className="mb-4 text-sm italic text-neutral-400">No resume uploaded.</p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => { if (e.target.files) setSelectedFile(e.target.files[0]); }}
              className="text-sm text-neutral-500 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-neutral-700 hover:file:bg-neutral-200 cursor-pointer"
            />
            <Button onClick={handleUploadResume} disabled={!selectedFile}>
              Upload
            </Button>
          </div>
        </Section>

        <Section title="Job Posting">
          <div className="text-sm">
            {application.jobUrl ? (
              <a
                href={/^https?:\/\//i.test(application.jobUrl) ? application.jobUrl : `https://${application.jobUrl}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                View Job Posting →
              </a>
            ) : (
              <span className="italic text-neutral-400">No job posting available.</span>
            )}
          </div>
        </Section>
      </div>

      {/* AI Resume Match entry point */}
      <div className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/40 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-600">AI</span>
            <h3 className="text-sm font-semibold text-neutral-900">Resume Match</h3>
          </div>
          <p className="mt-0.5 text-xs text-neutral-500">Score your resume against this job posting.</p>
        </div>
        <Button onClick={() => navigate(`/applications/${application.id}/match`)}>
          Analyze
        </Button>
      </div>

      <div className="flex flex-col-reverse gap-2.5 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <Button variant="secondary" onClick={() => navigate('/applications')}>
          Back
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>
    </div>
  );
}

export default ApplicationDetailsPage;
