import { Ignite } from '../../../datatypes';

export class HostedTokenization {
  public static async getFormattedHostedTokenizationResult(
    body: Ignite.HostedTokenizationServiceResponse,
  ): Promise<Ignite.HostedTokenizationResponse> {
    const { token = '' } = body || {};
    return { token };
  }
}
