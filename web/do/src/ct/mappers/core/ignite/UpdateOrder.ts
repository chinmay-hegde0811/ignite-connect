import { Ignite } from '../../../datatypes';

export class UpdateOrders {
  public static updateOrderPaymentResponseMapper(response: Ignite.UpdateOrder) {
    if (response?.body?.errors) {
      throw {
        message: '[CT] Failed to update order',
        details: response?.body?.errors,
        statusCode: 500,
      };
    }
    return {
      updatedOrder: response.body?.data?.updateOrder,
    };
  }
}
