import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorocycleODM from '../Models/MotorcycleODM';
import { IResponseHandler } from '../Utils/responseHandler';

export default class CarService {
  private model: MotorocycleODM;
  private handler: IResponseHandler;

  constructor(handler: IResponseHandler) {
    this.model = new MotorocycleODM();
    this.handler = handler;
  }

  private createDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle({
        id: motorcycle.id,
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