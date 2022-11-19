import IVehicle from '../Interfaces/IVehicle';

export default abstract class Vehicle {
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  protected id: string;

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

  getModel(): string {
    return this.model;
  }

  setModel(value: string): boolean {
    this.model = value;
    return true;
  }

  getYear(): number {
    return this.year;
  }

  setYear(value: number): boolean {
    this.year = value;
    return true;
  }

  getColor(): string {
    return this.color;
  }

  setColor(value: string): boolean {
    this.color = value;
    return true;
  }

  getStatus(): boolean {
    return this.status;
  }

  setStatus(value: boolean): boolean {
    this.status = value;
    return true;
  }

  getBuyValue(): number {
    return this.buyValue;
  }

  setBuyValue(value: number): boolean {
    this.buyValue = value;
    return true;
  }
}
