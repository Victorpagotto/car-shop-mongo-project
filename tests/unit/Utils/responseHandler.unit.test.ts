import * as sinon from 'sinon';
import * as chai from 'chai';
import ResponseHandlerAbs, { IAnswer, IResponse, IResponseHandler } from '../utils/responseHandler';

import { Response } from 'superagent';
import { sign, verify } from 'jsonwebtoken';
import ResponseHandler, { statusCodes } from '../utils/responseHandler/responseHandler';
import responseHandler from '../utils/responseHandler';

const { expect } = chai;

interface testPayload {
  email: string;
  password: string;
}

describe('Testa o funcionamento do responseHandler.', () => {
  it('Testa response com payload.', () => {
    const handler = new ResponseHandler(statusCodes);
    const payload: testPayload = {
      email: 'email@email.com',
      password: 'mySuperSecret',
    }
    const { status, result }: IResponse<testPayload> = handler.response<testPayload>('ok', payload);
    expect(status).to.be.equal(200);
    expect(result).to.be.deep.equal(payload);
  })
  it('Testa response com mensagem.', () => {
    const handler = new ResponseHandler(statusCodes);
    const message = 'My super message that no one can see besides my cat.'
    const { status, result }: IResponse<string> = handler.response<string>('badRequest', message);
    expect(status).to.be.equal(400);
    expect(result).to.be.deep.equal({ message });
  });
  it('Testa answer com payload.', () => {
    const handler = new ResponseHandler(statusCodes);
    const payload: testPayload = {
      email: 'email@email.com',
      password: 'mySuperSecret',
    }
    const { status, result, num }: IAnswer<testPayload> = handler.answer<testPayload>('ok', payload);
    expect(status).to.be.equal('ok');
    expect(result).to.be.deep.equal(payload);
    expect(num).to.be.equal(200);
  })
  it('Testa answer com mensagem.', () => {
    const handler = new ResponseHandler(statusCodes);
    const message = 'My super message that no one can see besides my cat.'
    const { status, result, num }: IAnswer<string> = handler.answer<string>('badRequest', message);
    expect(status).to.be.equal('badRequest');
    expect(result).to.be.deep.equal({ message });
    expect(num).to.be.equal(400);
  });
});