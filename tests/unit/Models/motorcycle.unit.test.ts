import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import { motorcyclesArray, motorcyclesArrayDB } from '../../mocks/MotorcycleList';
import { correctId } from '../../mocks/ids';
import MotorocycleODM from '../../../src/Models/MotorcycleODM';

describe('Testa a model com motocicletas.', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa o create.', async function () {
    // Cenário.
    sinon.stub(Model, 'create').resolves({ ...motorcyclesArrayDB[0] });
    const motorcycleModel = new MotorocycleODM();

    // Ação.
    const result = await motorcycleModel.create({ ...motorcyclesArray[0] });

    // Teste.
    expect(result).to.be.deep.equal({ ...motorcyclesArrayDB[0] });
  });

  it('Testa a busca por ID.', async function () {
    // Cenário.
    sinon.stub(Model, 'findById').resolves({ ...motorcyclesArrayDB[0] });
    const motorcycleModel = new MotorocycleODM();

    // Ação.
    const result = await motorcycleModel.getById(correctId);

    // Teste.
    expect(result).to.be.deep.equal({ ...motorcyclesArrayDB[0] });
  });

  it('Testa a busca comum.', async function () {
    // Cenário.
    sinon.stub(Model, 'find').resolves([...motorcyclesArrayDB]);
    const motorcycleModel = new MotorocycleODM();

    // Ação.
    const result = await motorcycleModel.get({});

    // Teste.
    expect(result).to.be.deep.equal(motorcyclesArrayDB);
  });

  it('Testa a atualização.', async function () {
    // Cenário.
    sinon.stub(Model, 'findByIdAndUpdate').resolves({ id: correctId, ...motorcyclesArray[0] });
    const motorcycleModel = new MotorocycleODM();

    // Ação.
    const result = await motorcycleModel.getAndUpdate(correctId, { ...motorcyclesArray[0] });

    // Teste.
    expect(result).to.be.deep.equal({ id: correctId, ...motorcyclesArray[0] });
  });

  it('Testa o delete.', async function () {
    // Cenário.
    sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 1, acknowledged: true });
    const motorcycleModel = new MotorocycleODM();

    // Ação.
    const result = await motorcycleModel.destroy(correctId);

    // Teste.
    expect(result).to.be.equal(true);
  });

  it('Testa delete falho.', async function () {
    // Cenário.
    sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 0, acknowledged: false });
    const motorcycleModel = new MotorocycleODM();

    // Ação.
    const result = await motorcycleModel.destroy(correctId);

    // Teste.
    expect(result).to.be.equal(false);
  });
});