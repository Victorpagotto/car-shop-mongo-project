import { IMessage, IResponse, IStatusCodes, IResponseHandler, IAnswer } from './types';
import ResponseHandler, { statusCodes } from './responseHandler';

export { IMessage, IResponse, IStatusCodes, IResponseHandler, IAnswer };

export default new ResponseHandler(statusCodes);
