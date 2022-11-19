import { NextFunction, Request, Response } from 'express';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import ResponseHandler, { IResponse } from '../Utils/responseHandler';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService(ResponseHandler);
  }

  async create() {
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
