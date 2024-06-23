import { Ignite } from '../../../datatypes';

export class TestConnection {
  public static getTestConnectionRequiredProps(request: Ignite.Request) {
    const {
      merchantId = '',
      integrator = '',
      apiKey = '',
      apiSecret = '',
      host = '',
    } = (request?.body || {}) as Ignite.TestConnectionPayload;

    return {
      merchantId,
      integrator,
      apiKey,
      apiSecret,
      host,
    };
  }

  public static testConnectionAppPayload(request: Ignite.Request) {
    const {
      merchantId = '',
      integrator = '',
      apiKey = '',
      apiSecret = '',
      host = '',
      enableLogs = false,
    } = (request?.body || {}) as Ignite.TestConnectionPayload;

    return {
      merchantId,
      integrator,
      apiKey,
      apiSecret,
      host,
      enableLogs,
    };
  }
}
