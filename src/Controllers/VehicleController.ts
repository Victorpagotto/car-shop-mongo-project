import { NextFunction, Request, Response } from 'express';
import VehicleService from '../Services/VehicleService';
import { IResponse } from '../Utils/responseHandler';

export default abstract class VehicleController<T, C> {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected service: VehicleService<T, C>;

  constructor(req: Request, res: Response, next: NextFunction, service: VehicleService<T, C>) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = service;
  }

  public async getById(): Promise<Response> {
    const { status, result }: IResponse<C | string> = await this.service
      .getById(this.req.params.id);
    return this.res.status(status).json(result);
  }

  public async get(): Promise<Response> {
    const info = {
      ...this.req.body,
    };
    const { status, result }: IResponse<C[] | string> = await this.service.get({ ...info });
    return this.res.status(status).json(result);
  }

  public async getAndUpdate(): Promise<Response> {
    const info = {
      ...this.req.body,
    };
    const { status, result }: IResponse<C | string> = await this.service
      .getAndUpdate(this.req.params.id, { ...info });
    return this.res.status(status).json(result);
  }

  public async destroy(): Promise<Response> {
    const { status, result }: IResponse<string | undefined> = await this.service
      .destroy(this.req.params.id);
    return this.res.status(status).json(result);
  }
}