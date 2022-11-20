import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
import { statusCodes } from '../../../src/Utils/responseHandler/responseHandler';
import CarInstance from '../../mocks/CarInstance';
import { correctId } from '../../mocks/ids';
import { carsArray } from '../../mocks/CarList';

describe('Testa o controller com carros.', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa o create.', async function () {
    // Cenário.
    sinon.stub(CarService.prototype, 'create')
      .resolves({
        status: statusCodes.created, result: CarInstance });
    const req = ({ body: { ...carsArray[0] } } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};
  
    // Ação.
    await new CarController(req, (res as unknown) as Response, nf).create();

    // Teste.
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(CarInstance)).to.be.equal(true);
  });

  it('Testa o getById', async function () {
    // Cenário.
    sinon.stub(CarService.prototype, 'getById')
      .resolves({
        status: statusCodes.ok, result: CarInstance });
    const req = ({ body: { }, params: { id: correctId } } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};

    // Ação.
    await new CarController(req, (res as unknown) as Response, nf).getById();

    // Teste.
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(CarInstance)).to.be.equal(true);
  });

  it('Testa o get.', async function () {
    // Cenário.
    sinon.stub(CarService.prototype, 'get')
      .resolves({
        status: statusCodes.ok, result: [CarInstance, CarInstance] });
    const req = ({ body: { } } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};

    // Ação.
    await new CarController(req, (res as unknown) as Response, nf).get();

    // Teste.
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith([CarInstance, CarInstance])).to.be.equal(true);
  });

  it('Testa o getAndUpdate', async function () {
    // Cenário.
    sinon.stub(CarService.prototype, 'getAndUpdate')
      .resolves({
        status: statusCodes.ok, result: CarInstance });
    const req = ({
      body: { ...carsArray[0] },
      params: { id: correctId },
    } as unknown) as Request;
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns({});
    const nf = () => {};
  
    // Ação.
    await new CarController(req, (res as unknown) as Response, nf).getAndUpdate();

    // Teste.
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(CarInstance)).to.be.equal(true);
  });

  it('Testa o destroy.', async function () {
    // Cenário.
    sinon.stub(CarService.prototype, 'destroy')
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
    await new CarController(req, (res as unknown) as Response, nf).destroy();

    // Teste.
    expect(res.status.calledWith(204)).to.be.equal(true);
    expect(res.json.calledWith(undefined)).to.be.equal(true);
  });
});