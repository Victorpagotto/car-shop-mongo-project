import ICar from '../Interfaces/ICar';
import { IMotorcycle } from '../Interfaces/IMotorcycle';
import Car from './Car';
import Motorcycle from './Motorcycle';

type VehicleTypes = 'car' | 'motorcycle';

export default class VehicleF {
  static create<T>(vehicle: T, type: VehicleTypes) {
    switch (type) {
      case 'car':
        return new Car({ ...vehicle as ICar });
      case 'motorcycle':
        return new Motorcycle({ ...vehicle as IMotorcycle });
      default:
        throw new Error('Invalid vehicle type.');
    }
  }
}