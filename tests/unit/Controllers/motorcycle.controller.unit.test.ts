import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { statusCodes } from '../../../src/Utils/responseHandler/responseHandler';
import motorcycleInstance from '../../mocks/MotorcycleInstance';
import { correctId } from '../../mocks/ids';
import { motorcyclesArray } from '../../mocks/MotorcycleList';

describe('Testa o controller com motocicletas.', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa o create.', async function () {
    // Cenário.
    sinon.stub(MotorcycleService.prototype, 'create')
      .resolves({
        status: statusCodes.created, result: motorcycleInstance });
    const req = ({ body: { ...motorcyclesArray[0] } } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};
  
    // Ação.
    await new MotorcycleController(req, (res as unknown) as Response, nf).create();

    // Teste.
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(motorcycleInstance)).to.be.equal(true);
  });

  it('Testa o getById', async function () {
    // Cenário.
    sinon.stub(MotorcycleService.prototype, 'getById')
      .resolves({
        status: statusCodes.ok, result: motorcycleInstance });
    const req = ({ body: { }, params: { id: correctId } } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};

    // Ação.
    await new MotorcycleController(req, (res as unknown) as Response, nf).getById();

    // Teste.
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(motorcycleInstance)).to.be.equal(true);
  });

  it('Testa o get.', async function () {
    // Cenário.
    sinon.stub(MotorcycleService.prototype, 'get')
      .resolves({
        status: statusCodes.ok, result: [motorcycleInstance, motorcycleInstance] });
    const req = ({ body: { } } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};

    // Ação.
    await new MotorcycleController(req, (res as unknown) as Response, nf).get();

    // Teste.
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith([motorcycleInstance, motorcycleInstance])).to.be.equal(true);
  });

  it('Testa o getAndUpdate', async function () {
    // Cenário.
    sinon.stub(MotorcycleService.prototype, 'getAndUpdate')
      .resolves({
        status: statusCodes.ok, result: motorcycleInstance });
    const req = ({
      body: { ...motorcyclesArray[0] },
      params: { id: correctId },
    } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};
  
    // Ação.
    await new MotorcycleController(req, (res as unknown) as Response, nf).getAndUpdate();

    // Teste.
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(motorcycleInstance)).to.be.equal(true);
  });

  it('Testa o destroy.', async function () {
    // Cenário.
    sinon.stub(MotorcycleService.prototype, 'destroy')
      .resolves({
        status: statusCodes.noContent, result: undefined });
    const req = ({
      body: { },
      params: { id: correctId },
    } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};
    // Ação.
    await new MotorcycleController(req, (res as unknown) as Response, nf).destroy();

    // Teste.
    expect(res.status.calledWith(204)).to.be.equal(true);
    expect(res.json.calledWith(undefined)).to.be.equal(true);
  });
});