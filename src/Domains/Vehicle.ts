import IVehicle from '../Interfaces/IVehicle';

export default abstract class Vehicle {
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  protected id: string | undefined;

  constructor(
    vehicle: IVehicle,
  ) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status || false;
    this.buyValue = vehicle.buyValue;
  }

  public getModel(): string {
    return this.model;
  }

  public setModel(value: string): boolean {
    this.model = value;
    return true;
  }

  public getYear(): number {
    return this.year;
  }

  public setYear(value: number): boolean {
    this.year = value;
    return true;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(value: string): boolean {
    this.color = value;
    return true;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public setStatus(value: boolean): boolean {
    this.status = value;
    return true;
  }

  public getBuyValue(): number {
    return this.buyValue;
  }

  public setBuyValue(value: number): boolean {
    this.buyValue = value;
    return true;
  }
}
