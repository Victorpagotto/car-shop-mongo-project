import { expect } from 'chai';
import { HydratedDocument } from 'mongoose';
import sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import responseHandler from '../../../src/Utils/responseHandler';
import { statusCodes } from '../../../src/Utils/responseHandler/responseHandler';
import { carsArray, carsArrayDB } from '../../mocks/CarList';
import { correctId, incorrectId } from '../../mocks/ids';
import { invalidMongoID, notFoundCarID } from '../../mocks/messages';

const SUCESSCASE = 'com sucesso.';
const INVALIDIDCASE = 'com id inválido.';
const NONEXISTENTIDCASE = 'com inexistente.';

describe('Testa o service de carros.', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testa o create.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'create')
        .resolves({ ...carsArrayDB[0] } as HydratedDocument<ICar>);

      // Ação.
      const result = await carService.create({ ...carsArray[0] });

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.created, result: { ...carsArrayDB[0] } });
    });
  });

  describe('Testa o getAndUpdate.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'getAndUpdate')
        .resolves({ ...carsArrayDB[0] } as HydratedDocument<ICar>);

      // Ação.
      const result = await carService.getAndUpdate(correctId, { ...carsArray[0] });

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.ok, result: { ...carsArrayDB[0] } });
    });

    it(INVALIDIDCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'getAndUpdate')
        .resolves({ ...carsArrayDB[0] } as never);

      // Ação.
      const result = await carService.getAndUpdate(incorrectId, { ...carsArray[0] });

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.unprocessable, result: invalidMongoID });
    });

    it(NONEXISTENTIDCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'getAndUpdate')
        .resolves(null);

      // Ação.
      const result = await carService.getAndUpdate(correctId, { ...carsArray[0] });

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.notFound, result: notFoundCarID });
    });
  });

  describe('Testa o destroy.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'destroy').resolves(true);

      // Ação.
      const result = await carService.destroy(correctId);

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.noContent, result: undefined });
    });

    it(INVALIDIDCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'destroy')
        .resolves(false as never);

      // Ação.
      const result = await carService.destroy(incorrectId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.unprocessable, result: invalidMongoID });
    });

    it(NONEXISTENTIDCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'destroy')
        .resolves(false);

      // Ação.
      const result = await carService.destroy(correctId);

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.notFound, result: notFoundCarID });
    });
  });

  describe('Testa o get', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'get')
        .resolves([...carsArrayDB] as HydratedDocument<ICar>[]);

      // Ação.
      const result = await carService.get({});

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.ok, result: [...carsArrayDB] });
    });
  });

  describe('Testa o getById.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'getById')
        .resolves({ ...carsArrayDB[1] } as HydratedDocument<ICar>);

      // Ação.
      const result = await carService.getById(correctId);

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.ok, result: { ...carsArrayDB[1] } });
    });

    it(INVALIDIDCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'getById')
        .resolves({ ...carsArrayDB[1] } as never);

      // Ação.
      const result = await carService.getById(incorrectId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.unprocessable, result: invalidMongoID });
    });

    it(NONEXISTENTIDCASE, async function () {
      // Cenário.
      const carService = new CarService(responseHandler);
      sinon.stub(CarODM.prototype, 'getById')
        .resolves(null);

      // Ação.
      const result = await carService.getById(correctId);

      // Resultado.
      expect(result).to.be.deep.equal({ status: statusCodes.notFound, result: notFoundCarID });
    });
  });
});
