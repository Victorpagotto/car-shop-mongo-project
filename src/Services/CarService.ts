import { HydratedDocument } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import { IResponseHandler } from '../Utils/responseHandler';
import VehicleService from './VehicleService';

export default class CarService extends VehicleService<ICar, Car> {
  constructor(handler: IResponseHandler) {
    const dbModel = new CarODM();
    const idMessage = 'Invalid mongo id';
    const notFoundMessage = 'Car not found';
    super(handler, dbModel, idMessage, notFoundMessage);
  }

  protected createDomain(car: HydratedDocument<ICar> | null): Car | null {
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
}