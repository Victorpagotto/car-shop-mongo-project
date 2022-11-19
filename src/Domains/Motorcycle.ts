import { CategoryTypes, IMotorcycle } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  category: CategoryTypes;
  engineCapacity: number;

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

  getCategory(): CategoryTypes {
    return this.category;
  }

  setCategory(value: CategoryTypes): boolean {
    this.category = value;
    return true;
  }

  getEngineCapacity(): number {
    return this.engineCapacity;
  }

  setEngineCapacity(value: number): boolean {
    this.engineCapacity = value;
    return true;
  }
}
