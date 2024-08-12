import { PSP } from '@ignite/ctintegration-do';
import axios from 'axios';

export class GetPayment {
  public async execute(
    connectOpts: PSP.Types.Ignite.ConnectOpts,
    paymentId: string,
  ) {
    const { apiKey, apiSecret } = connectOpts;
    const result = await axios.get(
      `${process.env.IGNITE_URL}/mock/psp/transaction`,
      {
        params: { transactionId: paymentId },
        headers: {
          'Content-Type': 'application/json',
          'x-psp-api-key': apiKey,
          'x-psp-api-secret': apiSecret,
        },
      },
    );
    if (result?.status === 500) {
      throw {
        message: 'Failed to process the get payment service',
        statusCode: result.status || 500,
        details: result.data.message,
      };
    }
    return result.data;
  }
}
