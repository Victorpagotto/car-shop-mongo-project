import { NextFunction, Request, Response } from 'express';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import ResponseHandler, { IResponse } from '../Utils/responseHandler';
import VehicleController from './VehicleController';

export default class CarController extends VehicleController<ICar, Car> {
  constructor(req: Request, res: Response, next: NextFunction) {
    const service = new CarService(ResponseHandler);
    super(req, res, next, service);
  }

  async create(): Promise<Response> {
    const info = this.req.body;
    const car: Partial<ICar> = {
      model: info.model,
      year: info.year,
      color: info.color,
      status: info.status || false,
      buyValue: info.buyValue,
      doorsQty: info.doorsQty,
      seatsQty: info.seatsQty,
    };
    const { status, result }: IResponse<Car> = await this.service.create(car);
    return this.res.status(status).json(result);
  }
}