import { Ignite } from '../../../datatypes';

export class GetOrderById {
  public static getOrderByIdResponseMapper(response: Ignite.OrderById) {
    return response?.body?.data?.order;
  }
}
