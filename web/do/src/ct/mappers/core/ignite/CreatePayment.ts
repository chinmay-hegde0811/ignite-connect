import { Payment } from '@commercetools/platform-sdk';
import { Ignite } from '../../../datatypes';

export class CreatePayment {
  public static createPaymentResponseMapper(
    response: Ignite.CreatePaymentResponse,
  ): Payment {
    if (response?.body?.errors || !response.body?.data?.createPayment) {
      throw {
        message: '[CT] Failed to create payment',
        statusCode: 500,
        details: response?.body?.errors,
      };
    }
    return response.body?.data?.createPayment;
  }
}
