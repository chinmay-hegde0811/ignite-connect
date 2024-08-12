import { PSP } from '@ignite/ctintegration-do';
import axios from 'axios';

export class HostedCheckout {
  public async execute(
    connectOpts: PSP.Types.Ignite.ConnectOpts,
    payload: PSP.Types.Ignite.HostedTokenizationPayload,
  ): Promise<PSP.Types.Ignite.HostedCheckoutResponse> {
    const { apiKey, apiSecret } = connectOpts;

    const result = await axios.post(
      `${process.env.IGNITE_URL}/mock/psp/initialize`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-psp-api-key': apiKey,
          'x-psp-api-secret': apiSecret,
        },
      },
    );

    if (result.status === 500) {
      throw {
        message: 'Failed to process the hosted checkout service',
        statusCode: result.status || 500,
        details: result.data.message,
      };
    }

    return PSP.Mappers.default.getFormattedHostedCheckoutResult(result?.data);
  }
}
