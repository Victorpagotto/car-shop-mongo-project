import { HydratedDocument } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorocycleODM from '../Models/MotorcycleODM';
import { IResponseHandler } from '../Utils/responseHandler';
import VehicleService from './VehicleService';

export default class MotorcycleService extends VehicleService<IMotorcycle, Motorcycle> {
  constructor(handler: IResponseHandler) {
    const dbModel = new MotorocycleODM();
    const idMessage = 'Invalid mongo id';
    const notFoundMessage = 'Motorcycle not found';
    super(handler, dbModel, idMessage, notFoundMessage);
  }

  protected createDomain(motorcycle: HydratedDocument<IMotorcycle> | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle({
        id: motorcycle.id || motorcycle._id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
      });
    }
    return null;
  }
}