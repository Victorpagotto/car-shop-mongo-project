import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = express.Router();

motorcycleRouter
  .delete('/:id', (req, res, next) => new MotorcycleController(req, res, next).destroy());
motorcycleRouter
  .put('/:id', (req, res, next) => new MotorcycleController(req, res, next).getAndUpdate());
motorcycleRouter
  .get('/:id', (req, res, next) => new MotorcycleController(req, res, next).getById());
motorcycleRouter
  .post('/', (req, res, next) => new MotorcycleController(req, res, next).create());
motorcycleRouter
  .get('/', (req, res, next) => new MotorcycleController(req, res, next).get());

export default motorcycleRouter;