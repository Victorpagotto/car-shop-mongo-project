import { HydratedDocument, isValidObjectId } from 'mongoose';
import AbstractODM from '../Models/AbstractODM';
import { IResponse, IResponseHandler } from '../Utils/responseHandler';

export default abstract class VehicleService<T, C> {
  protected model: AbstractODM<T>;
  protected handler: IResponseHandler;
  protected invalidMongoIdMessage: string;
  protected notFoundMessage: string;

  constructor(
    handler: IResponseHandler,
    model: AbstractODM<T>,
    idMessage: string,
    notFoundMessage: string,
  ) {
    this.handler = handler;
    this.model = model;
    this.invalidMongoIdMessage = idMessage;
    this.notFoundMessage = notFoundMessage;
  }

  protected abstract createDomain(obj: HydratedDocument<T> | null): C | null;
  async create(vehicle: Partial<T>): Promise<IResponse<C>> {
    const info = await this.model.create(vehicle);
    const result: C | null = this.createDomain(info);
    return this.handler.response<C>('created', result as C);
  }

  async get(vehicle: Partial<T>): Promise<IResponse<C[] | string>> {
    const info: HydratedDocument<T>[] = await this.model.get({ ...vehicle });
    const result: C[] = info.map((vehiclePositiojn: HydratedDocument<T>): C => (
      this.createDomain(vehiclePositiojn) as C));
    return this.handler.response('ok', result);
  }

  async getById(id: string): Promise<IResponse<C | string>> {
    if (!isValidObjectId(id)) {
      return this.handler.response('unprocessable', this.invalidMongoIdMessage);
    }
    const info: HydratedDocument<T> | null = await this.model.getById(id);
    const result: C | null = this.createDomain(info);
    if (!result) {
      return this.handler.response('notFound', this.notFoundMessage);
    }
    return this.handler.response('ok', result as C);
  }

  async getAndUpdate(id: string, vehicleInfo: Partial<T>): Promise<IResponse<C | string>> {
    if (!isValidObjectId(id)) {
      return this.handler.response('unprocessable', this.invalidMongoIdMessage);
    }
    const info: HydratedDocument<T> | null = await this.model
      .getAndUpdate(id, { ...vehicleInfo });
    const result: C | null = this.createDomain(info);
    if (!result) {
      return this.handler.response('notFound', this.notFoundMessage);
    }
    return this.handler.response('ok', result as C);
  }
}