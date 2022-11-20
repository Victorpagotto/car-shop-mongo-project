import express from 'express';
import CarController from '../Controllers/CarController';

const carRouter = express.Router();

carRouter.delete('/:id', (req, res, next) => new CarController(req, res, next).destroy());
carRouter.put('/:id', (req, res, next) => new CarController(req, res, next).getAndUpdate());
carRouter.get('/:id', (req, res, next) => new CarController(req, res, next).getById());
carRouter.post('/', (req, res, next) => new CarController(req, res, next).create());
carRouter.get('/', (req, res, next) => new CarController(req, res, next).get());

export default carRouter;