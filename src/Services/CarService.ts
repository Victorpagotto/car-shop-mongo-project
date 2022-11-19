import { HydratedDocument, isValidObjectId } from 'mongoose';
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
    const result: Car | null = this.createDomain(info);
    return this.handler.response<Car>('created', result as Car);
  }

  async get(car: Partial<ICar>): Promise<IResponse<Car[] | Car | string>> {
    const info: HydratedDocument<ICar>[] = await this.model.get({ ...car });
    const result: Car[] = info.map((carPositiojn: HydratedDocument<ICar>): Car => (
      this.createDomain(carPositiojn) as Car));
    return this.handler.response('ok', result);
  }

  async getById(id: string): Promise<IResponse<Car | string>> {
    if (!isValidObjectId(id)) {
      return this.handler.response('unprocessable', 'Invalid mongo id');
    }
    const info: HydratedDocument<ICar> | null = await this.model.getById(id);
    const result: Car | null = this.createDomain(info);
    if (!result) {
      return this.handler.response('notFound', 'Car not found');
    }
    return this.handler.response('ok', result as Car);
  }

  async getAndUpdate(id: string, carInfo: Partial<ICar>): Promise<IResponse<Car | string>> {
    if (!isValidObjectId(id)) {
      return this.handler.response('unprocessable', 'Invalid mongo id');
    }
    const info: HydratedDocument<ICar> | null = await this.model
      .getAndUpdate(id, { ...carInfo });
    const result: Car | null = this.createDomain(info);
    if (!result) {
      return this.handler.response('notFound', 'Car not found');
    }
    return this.handler.response('ok', result as Car);
  }
}