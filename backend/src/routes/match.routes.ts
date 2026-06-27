import { Router } from 'express';
import multer from 'multer';
import { matchResume } from '../controllers/match.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const memUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype === 'application/pdf');
  },
});

const router = Router();

router.post('/:id/match', authenticateToken, memUpload.single('resume'), matchResume);

export default router;
