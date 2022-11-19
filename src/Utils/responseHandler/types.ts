export interface IStatusCodes {
  [key: string]: number;
}

export interface IMessage {
  message: string;
}

export interface IResponse<T> {
  status: number;
  result: IMessage | T;
}

export interface IAnswer<T> {
  status: string;
  result: IMessage | T;
  num: number;
}

export abstract class IResponseHandler {
  public abstract statusCodes: IStatusCodes;
  public abstract response<T>(status: string, response: T | string): IResponse<T>;
  public abstract answer<T>(status: string, response: T | string): IAnswer<T>;
}
