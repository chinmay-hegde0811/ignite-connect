import { Ignite } from '../../../datatypes';

export class UpdateOrderPayment {
  public static updateOrderAddPaymentResponseMapper(
    response: Ignite.UpdateOrder,
  ) {
    if (response?.body?.errors?.length) {
      throw {
        message: '[CT] Failed to update order payment',
        details: response?.body?.errors,
        statusCode: 500,
      };
    }

    return {
      updateOrder: response?.body?.data?.updateOrder,
    };
  }
}
