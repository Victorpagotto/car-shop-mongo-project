import Car from '../../src/Domains/Car';
import { validCar } from './CarList';
import ICar from '../../src/Interfaces/ICar';

const newCar: ICar = validCar;
const carInstance = new Car(newCar);
export default carInstance;
