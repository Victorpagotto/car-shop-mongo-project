import * as chai from 'chai';

import ResponseHandler, { statusCodes } from '../../../src/Utils/responseHandler/responseHandler';
import { IAnswer, IResponse } from '../../../src/Utils/responseHandler';

const { expect } = chai;

interface TestPayLoad {
  email: string;
  password: string;
}

describe('Testa o funcionamento do responseHandler.', function () {
  it('Testa response com payload.', function () {
    const handler = new ResponseHandler(statusCodes);
    const payload: TestPayLoad = {
      email: 'email@email.com',
      password: 'mySuperSecret',
    };
    const { status, result }: IResponse<TestPayLoad> = handler.response<TestPayLoad>('ok', payload);
    expect(status).to.be.equal(200);
    expect(result).to.be.deep.equal(payload);
  });
  
  it('Testa response com mensagem.', function () {
    const handler = new ResponseHandler(statusCodes);
    const message = 'My super message that no one can see besides my cat.';
    const { status, result }: IResponse<string> = handler.response<string>('badRequest', message);
    expect(status).to.be.equal(400);
    expect(result).to.be.deep.equal({ message });
  });

  it('Testa answer com payload.', function () {
    const handler = new ResponseHandler(statusCodes);
    const payload: TestPayLoad = {
      email: 'email@email.com',
      password: 'mySuperSecret',
    };
    const { status, result, num }: IAnswer<TestPayLoad> = handler
      .answer<TestPayLoad>('ok', payload);
    expect(status).to.be.equal('ok');
    expect(result).to.be.deep.equal(payload);
    expect(num).to.be.equal(200);
  });

  it('Testa answer com mensagem.', function () {
    const handler = new ResponseHandler(statusCodes);
    const message = 'My super message that no one can see besides my cat.';
    const { status, result, num }: IAnswer<string> = handler.answer<string>('badRequest', message);
    expect(status).to.be.equal('badRequest');
    expect(result).to.be.deep.equal({ message });
    expect(num).to.be.equal(400);
  });
});