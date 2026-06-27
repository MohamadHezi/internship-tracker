import { getApplicationById } from './applications.service';

export interface MatchResult {
  score: number;
  strengths: string[];
  gaps: string[];
  isMock: boolean;
}

// ─── Stop words ──────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'before',
  'after', 'above', 'below', 'between', 'out', 'off', 'over', 'under',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
  'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  'can', 'will', 'just', 'should', 'now', 'that', 'this', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
  'does', 'did', 'would', 'could', 'may', 'might', 'must', 'shall',
  'we', 'our', 'they', 'their', 'it', 'its', 'you', 'your', 'he', 'she',
  'his', 'her', 'my', 'i', 'me', 'us', 'work', 'working', 'experience',
  'job', 'role', 'position', 'company', 'team', 'looking', 'seeking',
  'candidate', 'ability', 'strong', 'good', 'excellent', 'required',
  'preferred', 'using', 'use', 'used', 'skills', 'skill', 'knowledge',
  'understanding', 'familiar', 'familiarity', 'well', 'able', 'also',
  'including', 'include', 'as', 'etc', 'plus', 'nice', 'new', 'existing',
  'high', 'low', 'large', 'small', 'basic', 'advanced', 'help', 'build',
  'develop', 'development',
]);

// ─── Recognised tech skills (single words and fixed phrases) ─────────────────

const TECH_SKILLS: string[] = [
  // Languages
  'python', 'javascript', 'typescript', 'java', 'golang', 'rust', 'ruby',
  'swift', 'kotlin', 'scala', 'php', 'matlab', 'bash', 'perl', 'haskell',
  'elixir', 'clojure', 'dart', 'lua', 'groovy', 'fortran', 'cobol',
  // Web / UI
  'react', 'angular', 'vue', 'svelte', 'html', 'css', 'sass', 'tailwind',
  'nextjs', 'nuxt', 'gatsby', 'nodejs', 'express', 'fastify', 'nestjs',
  'django', 'flask', 'fastapi', 'spring', 'rails', 'laravel', 'graphql',
  'rest', 'grpc', 'websocket',
  // Databases
  'sql', 'postgresql', 'mysql', 'sqlite', 'mongodb', 'redis', 'dynamodb',
  'cassandra', 'elasticsearch', 'firebase', 'supabase', 'prisma',
  // Cloud / DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible',
  'jenkins', 'github', 'gitlab', 'circleci', 'linux', 'unix', 'nginx',
  // Data / ML
  'tensorflow', 'pytorch', 'keras', 'sklearn', 'pandas', 'numpy', 'scipy',
  'matplotlib', 'spark', 'hadoop', 'kafka', 'airflow', 'dbt',
  // Practices / tools
  'git', 'microservices', 'agile', 'scrum', 'tdd', 'testing', 'jest',
  'pytest', 'ci', 'cd', 'devops', 'algorithms', 'oop', 'concurrency',
  'networking', 'security', 'cryptography', 'blockchain', 'embedded',
  // Multi-word skills (checked as substrings)
  'machine learning', 'deep learning', 'computer vision', 'data science',
  'natural language', 'reinforcement learning', 'data engineering',
  'full stack', 'system design', 'object oriented', 'functional programming',
  'test driven',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Return unique meaningful tokens from text. */
function tokenize(text: string): string[] {
  return [...new Set(
    normalize(text).split(' ').filter(w => w.length > 2 && !STOP_WORDS.has(w))
  )];
}

/** Find which TECH_SKILLS strings appear in the normalised text. */
function detectSkills(normalizedText: string): string[] {
  return TECH_SKILLS.filter(skill => normalizedText.includes(skill));
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

/**
 * Deterministic scoring with three weighted components:
 *   60 pts  keyword overlap (job description ↔ resume)
 *   30 pts  tech skill overlap
 *   10 pts  resume quality indicators
 */
function computeScore(
  position: string,
  notes: string | null,
  resumeText: string
): MatchResult {
  const jobText = `${position} ${notes ?? ''}`;
  const jobNorm = normalize(jobText);
  const resumeNorm = normalize(resumeText);

  // ── 1. Keyword overlap ────────────────────────────────────────────────────

  const jobTokens = tokenize(jobText);
  const resumeTokenSet = new Set(tokenize(resumeText));

  const matchedKeywords = jobTokens.filter(t => resumeTokenSet.has(t));
  const missingKeywords = jobTokens.filter(t => !resumeTokenSet.has(t));

  const keywordRate = jobTokens.length > 0
    ? matchedKeywords.length / jobTokens.length
    : 0.4;                          // fallback if job description is empty

  const keywordScore = Math.round(keywordRate * 60);

  // ── 2. Tech skill overlap ─────────────────────────────────────────────────

  const jobSkills = detectSkills(jobNorm);
  const resumeSkills = detectSkills(resumeNorm);
  const resumeSkillSet = new Set(resumeSkills);

  let skillScore: number;
  let matchedSkills: string[];
  let missingSkills: string[];

  const noJobSkills = jobSkills.length === 0;

  if (!noJobSkills) {
    matchedSkills = jobSkills.filter(s => resumeSkillSet.has(s));
    missingSkills = jobSkills.filter(s => !resumeSkillSet.has(s));
    skillScore = Math.round((matchedSkills.length / jobSkills.length) * 30);
  } else {
    // No recognisable tech skills in the job description — cannot do a real
    // skill comparison. Reward resume skill breadth as a proxy, but flag this
    // clearly in the results so the user knows the comparison is limited.
    matchedSkills = [];
    missingSkills = [];
    skillScore = Math.min(15, Math.round((resumeSkills.length / 8) * 15));
  }

  // ── 3. Resume quality ─────────────────────────────────────────────────────

  const wordCount = resumeText.split(/\s+/).filter(Boolean).length;
  const hasNumbers = /\d/.test(resumeText);
  const hasPercentages = /%/.test(resumeText);

  let qualityScore = 0;
  if (wordCount >= 150) qualityScore += 3;
  if (wordCount >= 350) qualityScore += 3;
  if (hasNumbers)       qualityScore += 2;
  if (hasPercentages)   qualityScore += 2;

  // ── Total ─────────────────────────────────────────────────────────────────

  const totalScore = Math.min(100, Math.max(0, keywordScore + skillScore + qualityScore));

  // ── Strengths ─────────────────────────────────────────────────────────────

  const strengths: string[] = [];

  if (!noJobSkills && matchedSkills.length > 0) {
    strengths.push(
      `Skills matching this job's description: ${matchedSkills.slice(0, 5).join(', ')}`
    );
  }
  if (matchedKeywords.length > 0) {
    strengths.push(
      `Resume covers ${matchedKeywords.length} of ${jobTokens.length} key terms from the job description`
    );
  }
  if (wordCount >= 350) {
    strengths.push(`Well-developed resume (${wordCount} words)`);
  }
  if (hasPercentages) {
    strengths.push('Resume contains percentage-based metrics — strong evidence of impact');
  } else if (hasNumbers) {
    strengths.push('Resume includes quantifiable data points');
  }
  if (strengths.length === 0) {
    strengths.push('Resume was successfully parsed and scored');
  }

  // ── Gaps ─────────────────────────────────────────────────────────────────

  const gaps: string[] = [];

  if (noJobSkills) {
    gaps.push(
      'No technical skills were detected in the job description — open this application, fill in the Notes field with the actual job requirements, then re-run the match for a proper skill-by-skill comparison'
    );
  } else if (missingSkills.length > 0) {
    gaps.push(
      `Skills in the job description not found in your resume: ${missingSkills.slice(0, 5).join(', ')}`
    );
  }
  if (missingKeywords.length > 2) {
    gaps.push(
      `Job keywords absent from resume: ${missingKeywords.slice(0, 5).join(', ')}`
    );
  }
  if (wordCount < 150) {
    gaps.push(`Resume is very short (${wordCount} words) — expand experience and project descriptions`);
  } else if (wordCount < 350) {
    gaps.push(`Resume could be more detailed (${wordCount} words) — consider adding project outcomes`);
  }
  if (!hasNumbers) {
    gaps.push('No measurable results detected — add numbers to show impact (e.g. "reduced latency by 40%")');
  }
  if (gaps.length === 0) {
    gaps.push('Tailor the resume summary to mirror the exact language used in this job posting');
  }

  return {
    score: totalScore,
    strengths: strengths.slice(0, 5),
    gaps: gaps.slice(0, 5),
    isMock: false,
  };
}

// ─── Public API (signature unchanged) ────────────────────────────────────────

export async function scoreResumeMatch(
  applicationId: number,
  userId: number,
  resumeText: string
): Promise<MatchResult | null> {
  const application = await getApplicationById(applicationId, userId);
  if (!application) return null;

  return computeScore(application.position, application.notes, resumeText);
}
