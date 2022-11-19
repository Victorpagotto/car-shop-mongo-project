import { NextFunction, Request, Response } from 'express';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import responseHandler, { IResponse } from '../Utils/responseHandler';
import VehicleController from './VehicleController';

export default class MotorcycleController extends VehicleController<IMotorcycle, Motorcycle> {
  constructor(req: Request, res: Response, next: NextFunction) {
    const service = new MotorcycleService(responseHandler);
    super(req, res, next, service);
  }

  async create(): Promise<Response> {
    const info = this.req.body;
    const motorcycle: Partial<IMotorcycle> = {
      model: info.model,
      year: info.year,
      color: info.color,
      status: info.status || false,
      buyValue: info.buyValue,
      category: info.category,
      engineCapacity: info.engineCapacity,
    };
    const { status, result }: IResponse<Motorcycle> = await this.service.create(motorcycle);
    return this.res.status(status).json(result);
  }
}