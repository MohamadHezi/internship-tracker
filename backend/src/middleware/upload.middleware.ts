import multer from 'multer';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'src/uploads');
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