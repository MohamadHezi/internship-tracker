import type { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
      };

      file?: Multer.File;
    }
  }
}

export {};