import { Ignite } from '../../../datatypes';

export class HostedCheckout {
  public static async getFormattedHostedCheckoutResult(
    body: Ignite.HostedCheckoutServiceResponse,
  ): Promise<Ignite.HostedCheckoutResponse> {
    const { transactionId = '', action = '', redirectUrl = '' } = body || {};
    return {
      transactionId,
      redirectUrl,
      action,
    };
  }
}
