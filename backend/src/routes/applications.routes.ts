import { Router } from 'express';
import { getApplications, postApplication, removeApplication, editApplication } from '../controllers/applications.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getApplications);
router.post('/', authenticateToken, postApplication);
router.put('/:id', authenticateToken, editApplication);
router.delete('/:id', authenticateToken, removeApplication);

export default router;