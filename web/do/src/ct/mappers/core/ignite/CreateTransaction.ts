import { Ignite } from '../../../datatypes';

export class CreateTransaction {
  public static createTransactionResponseMapper(
    response: Ignite.UpdatePayment,
  ) {
    if (response?.body?.errors?.length) {
      throw {
        message: '[CT] Failed to update payment',
        details: response?.body?.errors,
        statusCode: 500,
      };
    }

    return {
      updatedPayment: response?.body?.data?.updatePayment,
    };
  }
}
