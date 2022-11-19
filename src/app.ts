import express from 'express';
import carRouter from './Routers/CarRouter';

const app = express();

app.use(express.json());
app.use('/cars', carRouter);

export default app;
