import { HydratedDocument } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import { IResponse, IResponseHandler } from '../Utils/responseHandler';

export default class CarService {
  private model: CarODM;
  private handler: IResponseHandler;

  constructor(handler: IResponseHandler) {
    this.model = new CarODM();
    this.handler = handler;
  }

  private createDomain(car: HydratedDocument<ICar> | null): Car | null {
    if (car) {
      return new Car({
        id: car.id || car._id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      });
    }
    return null;
  }

  async create(car: Partial<ICar>): Promise<IResponse<Car>> {
    const info = await this.model.create(car);
    const newCar = this.createDomain(info);
    return this.handler.response<Car>('created', newCar as Car);
  }
}