import multer from 'multer';
import fs from 'fs';

const uploadDir = process.env.UPLOAD_DIR || 'src/uploads';
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, uploadDir);
  },

  filename: (request, file, callback) => {
    callback(
      null,
      `${Date.now()}-${file.originalname}`
    );
  },
});

export const upload = multer({
  storage,
});