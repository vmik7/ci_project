import express from 'express';
import { apiRouter, mainRouter } from './router';

const app = express();
const port = 8086;

app.use('/', mainRouter);
app.use('/api', apiRouter);

app.listen(port, () => console.log(`Running on port ${port}`));
