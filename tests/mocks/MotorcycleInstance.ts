import Motorcycle from '../../src/Domains/Motorcycle';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';
import { validMotorcycle } from './MotorcycleList';

const newMotorcycle: IMotorcycle = validMotorcycle;
const motorcycleInstance: Motorcycle = new Motorcycle(newMotorcycle);

export default motorcycleInstance;
