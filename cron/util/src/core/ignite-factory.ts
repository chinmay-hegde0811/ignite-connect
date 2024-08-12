import { Common } from './ignite/Common';
import { Headers } from './ignite/Headers';
import { LoggerUtil } from './ignite/LoggerUtil';
import { Methods } from './ignite/Methods';
import { ResponseManager } from './ignite/Response';
import { AuthenticateSession } from './ignite/SessionAuthentication';

export abstract class Ignite {
  public get hasAuthHeaderOrThrowError() {
    return Common.hasAuthHeaderOrThrowError;
  }

  public get hasRequiredParamsInBody() {
    return Common.hasRequiredParamsInBody;
  }

  public get hasRequiredParamsInQueryString() {
    return Common.hasRequiredParamsInQueryString;
  }

  public get retry() {
    return Common.retry;
  }

  public get cors() {
    return Headers.cors;
  }

  public get logger() {
    return LoggerUtil.logger;
  }

  public get isGetRequest() {
    return Methods.isGetRequest;
  }

  public get isPostRequest() {
    return Methods.isPostRequest;
  }

  public get isPutRequest() {
    return Methods.isPutRequest;
  }

  public get isOptionsRequest() {
    return Methods.isOptionsRequest;
  }

  public get isMultiPartRequest() {
    return Methods.isMultiPartRequest;
  }

  public get isGetRequestOrThrowError() {
    return Methods.isGetRequestOrThrowError;
  }

  public get isPostRequestOrThrowError() {
    return Methods.isPostRequestOrThrowError;
  }

  public get isPutRequestOrThrowError() {
    return Methods.isPutRequestOrThrowError;
  }

  public get setResponseTo200() {
    return new ResponseManager().setResponseTo200;
  }

  public get setResponse() {
    return new ResponseManager().setResponse;
  }

  public get setResponseError() {
    return new ResponseManager().setResponseError;
  }

  public get setResponseTo201() {
    return new ResponseManager().setResponseTo201;
  }

  public get setResponseToEmpty() {
    return new ResponseManager().setResponseToEmpty;
  }

  public get authenticateSession() {
    return new AuthenticateSession().processRequest;
  }
}
