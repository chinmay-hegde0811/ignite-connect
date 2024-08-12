import { Util } from '@ignite/ctintegration-util';
import { PSP } from '@ignite/ctintegration-do';
import axios from 'axios';

export class RefundPayment {
  public async execute(
    connectOpts: PSP.Types.Ignite.ConnectOpts,
    payload: PSP.Types.Ignite.RefundPaymentRequest,
  ): Promise<PSP.Types.Ignite.RefundPaymentResponse> {
    const { apiKey, apiSecret } = connectOpts;
    const result = await axios.post(
      `${process.env.IGNITE_URL}/mock/psp/refund`,
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
        `[createRefundPaymentService] Failed to process the service: ${JSON.stringify(
          result?.status,
        )}`,
      );
      throw {
        message: 'Failed to process the refund payment service',
        statusCode: result.status || 500,
        details: result.data.message,
      };
    }

    return result.data;
  }
}
