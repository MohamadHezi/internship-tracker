import express from 'express';
import applicationsRouter from './routes/applications.routes';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (request, response) => {
  response.send('Internship Tracker API');
});

app.use('/applications', applicationsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});