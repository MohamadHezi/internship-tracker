import { Router } from 'express';
import { getApplications, postApplication, removeApplication, editApplication } from '../controllers/applications.controller';

const router = Router();

router.get('/', getApplications);
router.post('/', postApplication);
router.delete('/:id', removeApplication);
router.put('/:id', editApplication);

export default router;