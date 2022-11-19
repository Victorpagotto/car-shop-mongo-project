import IVehicle from './IVehicle';

type CategoryTypes = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicle {
  category: CategoryTypes;
  engineCapacity: number;
}

export { IMotorcycle, CategoryTypes };