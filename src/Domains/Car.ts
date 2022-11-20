import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    car: ICar,
  ) {
    super(
      {
        id: car.id,
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
      },
    );
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public getDoorsQty(): number {
    return this.doorsQty;
  }
  
  public setDoorsQty(value: number): boolean {
    this.doorsQty = value;
    return true;
  }

  public getSeatsQty(): number {
    return this.seatsQty;
  }

  public setSeatsQty(value: number): boolean {
    this.seatsQty = value;
    return true;
  }
}