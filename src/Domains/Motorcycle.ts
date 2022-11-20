import IMotorcycle, { CategoryTypes } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: CategoryTypes;
  private engineCapacity: number;

  constructor(
    motorcycle: IMotorcycle,
  ) {
    super(
      {
        id: motorcycle.id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
      },
    );
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  public getCategory(): CategoryTypes {
    return this.category;
  }

  public setCategory(value: CategoryTypes): boolean {
    this.category = value;
    return true;
  }

  public getEngineCapacity(): number {
    return this.engineCapacity;
  }

  public setEngineCapacity(value: number): boolean {
    this.engineCapacity = value;
    return true;
  }
}
