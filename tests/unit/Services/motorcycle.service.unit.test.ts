import { expect } from 'chai';
import { HydratedDocument } from 'mongoose';
import sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import Motorcycleservice from '../../../src/Services/MotorcycleService';
import responseHandler from '../../../src/Utils/responseHandler';
import { statusCodes } from '../../../src/Utils/responseHandler/responseHandler';
import { motorcyclesArray, motorcyclesArrayDB } from '../../mocks/MotorcycleList';
import { correctId, incorrectId } from '../../mocks/ids';
import { invalidMongoID, notFoundMotorcycleId } from '../../mocks/messages';

const SUCESSCASE = 'com sucesso.';
const INVALIDIDCASE = 'com id inválido.';
const NONEXISTENTIDCASE = 'com inexistente.';

describe('Testa o service de motocicletas.', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testa o create.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'create')
        .resolves({ ...motorcyclesArrayDB[0] } as HydratedDocument<IMotorcycle>);

      // Ação.
      const result = await motorcycleService.create({ ...motorcyclesArray[0] });

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.created, result: { ...motorcyclesArrayDB[0] } });
    });
  });

  describe('Testa o update.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'getAndUpdate')
        .resolves({ ...motorcyclesArrayDB[0] } as HydratedDocument<IMotorcycle>);

      // Ação.
      const result = await motorcycleService.getAndUpdate(correctId, { ...motorcyclesArray[0] });

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.ok, result: { ...motorcyclesArrayDB[0] } });
    });

    it(INVALIDIDCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'getAndUpdate')
        .resolves({ ...motorcyclesArrayDB[0] } as never);

      // Ação.
      const result = await motorcycleService.getAndUpdate(incorrectId, { ...motorcyclesArray[0] });

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.unprocessable, result: invalidMongoID });
    });

    it(NONEXISTENTIDCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'getAndUpdate')
        .resolves(null);
      // Ação.
      const result = await motorcycleService.getAndUpdate(correctId, { ...motorcyclesArray[0] });

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.notFound, result: notFoundMotorcycleId });
    });
  });

  describe('Testa o destroy.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'destroy').resolves(true);
      // Ação.
      const result = await motorcycleService.destroy(correctId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.noContent, result: undefined });
    });

    it(INVALIDIDCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'destroy')
        .resolves(false as never);

      // Ação.
      const result = await motorcycleService.destroy(incorrectId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.unprocessable, result: invalidMongoID });
    });

    it(NONEXISTENTIDCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'destroy')
        .resolves(false);

      // Ação.
      const result = await motorcycleService.destroy(correctId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.notFound, result: notFoundMotorcycleId });
    });
  });

  describe('Testa o get', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'get')
        .resolves([...motorcyclesArrayDB] as HydratedDocument<IMotorcycle>[]);

      // Ação.
      const result = await motorcycleService.get({});

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.ok, result: [...motorcyclesArrayDB] });
    });
  });

  describe('Testa o getById.', function () {
    it(SUCESSCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'getById')
        .resolves({ ...motorcyclesArrayDB[1] } as HydratedDocument<IMotorcycle>);

      // Ação.
      const result = await motorcycleService.getById(correctId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.ok, result: { ...motorcyclesArrayDB[1] } });
    });

    it(INVALIDIDCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'getById')
        .resolves({ ...motorcyclesArrayDB[1] } as never);

      // Ação.
      const result = await motorcycleService.getById(incorrectId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.unprocessable, result: invalidMongoID });
    });

    it(NONEXISTENTIDCASE, async function () {
      // Cenário.
      const motorcycleService = new Motorcycleservice(responseHandler);
      sinon.stub(MotorcycleODM.prototype, 'getById')
        .resolves(null);
      
      // Ação.
      const result = await motorcycleService.getById(correctId);

      // Resultado.
      expect(result).to.be.deep
        .equal({ status: statusCodes.notFound, result: notFoundMotorcycleId });
    });
  });
});
