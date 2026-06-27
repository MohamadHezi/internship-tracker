import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplication } from '../services/applicationService';
import { scoreMatch } from '../services/matchService';
import type { Application } from '../types/application';
import type { MatchResult } from '../services/matchService';
import Button from '../components/ui/Button';

function getScoreDisplay(score: number) {
  if (score >= 75) return { label: 'Strong match', textColor: 'text-emerald-600', barColor: 'bg-emerald-500' };
  if (score >= 50) return { label: 'Moderate match', textColor: 'text-amber-600', barColor: 'bg-amber-500' };
  return { label: 'Weak match — resume needs work for this role', textColor: 'text-red-500', barColor: 'bg-red-500' };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ResumeMatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [application, setApplication] = useState<Application | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getApplication(Number(id))
      .then(setApplication)
      .catch(() => setError('Could not load application.'));
  }, [id]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setResult(null);
    setError('');
  }

  function handleClear() {
    setSelectedFile(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleAnalyze() {
    if (!selectedFile || !id) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const matchResult = await scoreMatch(Number(id), selectedFile);
      setResult(matchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze match.');
    } finally {
      setLoading(false);
    }
  }

  const scoreDisplay = result ? getScoreDisplay(result.score) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back nav */}
      <button
        onClick={() => navigate(`/applications/${id}`)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Application
      </button>

      {/* Page header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700 tracking-wide">
            AI
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Resume Match</h1>
        </div>
        {application ? (
          <p className="mt-1.5 text-sm text-neutral-500">
            Scoring your resume against{' '}
            <span className="font-medium text-neutral-700">{application.position}</span>
            {' '}at{' '}
            <span className="font-medium text-neutral-700">{application.company}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-sm text-neutral-400 animate-pulse">Loading job context...</p>
        )}
      </div>

      {/* File upload card */}
      <div className="rounded-xl border border-neutral-100 bg-white p-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
          Upload Resume
        </p>

        {!selectedFile ? (
          /* Drop zone */
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-6 py-12 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/30 focus:outline-none"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" className="text-neutral-400">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-700">Click to upload your resume</p>
            <p className="mt-1 text-xs text-neutral-400">PDF only · max 10 MB</p>
          </button>
        ) : (
          /* File selected state */
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" className="text-red-500">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-800">{selectedFile.name}</p>
                <p className="text-xs text-neutral-400">{formatBytes(selectedFile.size)}</p>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="shrink-0 rounded-md p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 transition-colors"
                title="Remove file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Action row */}
        <div className="mt-4 flex items-center justify-between">
          {!selectedFile ? (
            <p className="text-xs text-neutral-400">Select a PDF file to get started</p>
          ) : !result ? (
            <p className="text-xs text-neutral-400">Ready to analyze</p>
          ) : (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Upload a different resume
            </button>
          )}
          <Button
            onClick={handleAnalyze}
            disabled={!selectedFile || loading || !application}
            isLoading={loading}
            className="px-5"
          >
            {loading ? 'Analyzing...' : 'Analyze Match'}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      {/* Results */}
      {result && scoreDisplay && (
        <div className="space-y-4">
          {/* Demo mode notice */}
          {result.isMock && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Demo mode.</span> Add your{' '}
                <code className="rounded bg-amber-100 px-1 font-mono text-xs">OPENAI_API_KEY</code>
                {' '}to{' '}
                <code className="rounded bg-amber-100 px-1 font-mono text-xs">backend/.env</code>
                {' '}to enable real AI analysis.
              </p>
            </div>
          )}

          {/* Score card */}
          <div className="rounded-xl border border-neutral-100 bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Match Score</p>
            <div className="mt-4 flex items-end gap-3">
              <span className={`text-6xl font-bold tracking-tight leading-none ${scoreDisplay.textColor}`}>
                {result.score}
              </span>
              <span className="mb-1 text-2xl font-semibold text-neutral-200">/100</span>
            </div>
            <div className="mt-5 h-2 rounded-full bg-neutral-100">
              <div
                className={`h-2 rounded-full transition-all duration-700 ${scoreDisplay.barColor}`}
                style={{ width: `${result.score}%` }}
              />
            </div>
            <p className={`mt-2 text-sm font-medium ${scoreDisplay.textColor}`}>{scoreDisplay.label}</p>
          </div>

          {/* Strengths and Gaps */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-100 bg-white p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Strengths
              </h3>
              <ul className="space-y-2.5">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-red-100 bg-white p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-500">
                Gaps &amp; Improvements
              </h3>
              <ul className="space-y-2.5">
                {result.gaps.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="mt-0.5 shrink-0 text-red-400">→</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeMatchPage;
