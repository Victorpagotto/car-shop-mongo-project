import express from 'express';
import carRouter from './Routers/CarRouter';
import motorcycleRouter from './Routers/MotorcycleRouter';

const app = express();

app.use(express.json());
app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);

export default app;
