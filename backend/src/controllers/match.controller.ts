import { Request, Response } from 'express';
import { scoreResumeMatch } from '../services/match.service';
import { extractPdfText } from '../services/pdf.service';

export async function matchResume(request: Request, response: Response) {
  const applicationId = Number(request.params.id);

  if (isNaN(applicationId)) {
    return response.status(400).json({ message: 'Invalid application ID' });
  }

  if (!request.file) {
    return response.status(400).json({ message: 'A PDF resume file is required' });
  }

  const resumeText = await extractPdfText(request.file.buffer);

  if (!resumeText) {
    return response
      .status(422)
      .json({ message: 'Could not extract text from this PDF. Make sure it is not a scanned image.' });
  }

  const result = await scoreResumeMatch(applicationId, request.user.userId, resumeText);

  if (!result) {
    return response.status(404).json({ message: 'Application not found' });
  }

  return response.json(result);
}
