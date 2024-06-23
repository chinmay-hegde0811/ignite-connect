import { Ignite } from '../../../datatypes';

export class GetPaymentById {
  public static getPaymentByIdResponseMapper(response: Ignite.PaymentById) {
    return response?.body?.data?.payment;
  }
}
