import { Util } from '@ignite/ctintegration-util';
import { PSP } from '@ignite/ctintegration-do';
import axios from 'axios';

export class CapturePayment {
  public async execute(
    connectOpts: PSP.Types.Ignite.ConnectOpts,
    payload: PSP.Types.Ignite.CapturePaymentRequest,
  ): Promise<PSP.Types.Ignite.CapturePaymentResponse> {
    const { apiKey, apiSecret } = connectOpts;
    const result = await axios.post(
      `${process.env.IGNITE_URL}/mock/psp/capture`,
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
      Util.Core.logger().error(
        `[capturePaymentService] Failed to process the service: ${JSON.stringify(
          result?.status,
        )}`,
      );
      throw {
        message: 'Failed to process the capture payment service',
        statusCode: result.status || 500,
        details: result.data.message,
      };
    }
    const { id, action } = result.data;
    return { id, action };
  }
}
