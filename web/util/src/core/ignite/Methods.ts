import { IncomingMessage } from 'http';

export class Methods {
  public static isPostRequest = (method = '') => method === 'POST';

  public static isGetRequest = (method = '') => method === 'GET';

  public static isPutRequest = (method = '') => method === 'PUT';

  public static isOptionsRequest = (method = '') => method === 'OPTIONS';

  public static isMultiPartRequest = (request: IncomingMessage) =>
    !!request.rawHeaders.find((header) => header.includes('multipart/form-data'));

  public static isGetRequestOrThrowError = async (method = '') => {
    if (!Methods.isGetRequest(method)) {
      throw { statusCode: 405, message: 'Method not allowed' };
    }
  };

  public static isPostRequestOrThrowError = async (method = '') => {
    if (!Methods.isPostRequest(method)) {
      throw { statusCode: 405, message: 'Method not allowed' };
    }
  };

  public static isPutRequestOrThrowError = async (method = '') => {
    if (!Methods.isPutRequest(method)) {
      throw { statusCode: 405, message: 'Method not allowed' };
    }
  };
}
