import dotenv from 'dotenv';

dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import applicationsRouter from './routes/applications.routes';
import authRouter from './routes/auth.routes';
import dashboardRouter from './routes/dashboard.routes';
import matchRouter from './routes/match.routes';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = Number(process.env.PORT) || 3000;

app.get('/', (request, response) => {
  response.send('Internship Tracker API');
});

app.use(
  '/uploads',
  express.static(
    path.join(__dirname, 'uploads')
  )
);

app.use('/applications', applicationsRouter);
app.use('/applications', matchRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});