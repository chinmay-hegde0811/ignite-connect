import { CT } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { App } from '@ignite/ctintegration-do';

export class GetHostedTokenization {
  public async execute(payload: App.Types.Ignite.GetHostedTokenizationPayload) {
    const customConfig = await CT.Core.getCustomObjects(payload.storeId);

    if (!customConfig) {
      throw {
        message: 'Failed to fetch configuration',
        statusCode: 500,
      };
    }
    // Prepare service payload for get payment status
    const serviceResponse =
      (await PSP.Core.getHostedTokenization()) as App.Types.Ignite.GetHostedTokenizationResponse;

    return serviceResponse;
  }
}
