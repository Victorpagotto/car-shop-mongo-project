import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarODM from '../../../src/Models/CarODM';
import { carsArray, carsArrayDB } from '../../mocks/CarList';
import { correctId } from '../../mocks/ids';

describe('Testa a model com carros.', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa o create.', async function () {
    // Cenário.
    sinon.stub(Model, 'create').resolves({ ...carsArrayDB[0] });
    const carModel = new CarODM();

    // Ação.
    const result = await carModel.create({ ...carsArray[0] });

    // Teste.
    expect(result).to.be.deep.equal({ ...carsArrayDB[0] });
  });

  it('Testa a busca por ID.', async function () {
    // Cenário.
    sinon.stub(Model, 'findById').resolves({ ...carsArrayDB[0] });
    const carModel = new CarODM();

    // Ação.
    const result = await carModel.getById(correctId);

    // Teste.
    expect(result).to.be.deep.equal({ ...carsArrayDB[0] });
  });

  it('Testa a busca comum.', async function () {
    // Cenário.
    sinon.stub(Model, 'find').resolves([...carsArrayDB]);
    const carModel = new CarODM();

    // Ação.
    const result = await carModel.get({});

    // Teste.
    expect(result).to.be.deep.equal(carsArrayDB);
  });

  it('Testa a atualização.', async function () {
    // Cenário.
    sinon.stub(Model, 'findByIdAndUpdate').resolves({ id: correctId, ...carsArray[0] });
    const carModel = new CarODM();

    // Ação.
    const result = await carModel.getAndUpdate(correctId, { ...carsArray[0] });

    // Teste.
    expect(result).to.be.deep.equal({ id: correctId, ...carsArray[0] });
  });

  it('Testa o delete.', async function () {
    // Cenário.
    sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 1, acknowledged: true });
    const carModel = new CarODM();

    // Ação.
    const result = await carModel.destroy(correctId);

    // Teste.
    expect(result).to.be.equal(true);
  });

  it('Testa delete falho.', async function () {
    // Cenário.
    sinon.stub(Model, 'deleteOne').resolves({ deletedCount: 0, acknowledged: false });
    const carModel = new CarODM();

    // Ação.
    const result = await carModel.destroy(correctId);

    // Teste.
    expect(result).to.be.equal(false);
  });
});