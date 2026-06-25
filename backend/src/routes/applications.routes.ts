import { Router } from 'express';
import { getApplications, postApplication, removeApplication, editApplication, getApplication, uploadResume } from '../controllers/applications.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.get('/', authenticateToken, getApplications);
router.post('/', authenticateToken, postApplication);
router.get('/:id', authenticateToken, getApplication);
router.post('/:id/resume', authenticateToken, upload.single('resume'), uploadResume);
router.put('/:id', authenticateToken, editApplication);
router.delete('/:id', authenticateToken, removeApplication);

export default router;