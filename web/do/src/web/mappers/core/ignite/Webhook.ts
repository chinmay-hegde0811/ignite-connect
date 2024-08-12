import { Ignite } from '../../../datatypes';

export class Webhook {
  public static getWebhookAppPayload(request: Ignite.Request) {
    const payload = (request?.body || {}) as Ignite.Transaction;
    return {
      payload,
    };
  }
}
