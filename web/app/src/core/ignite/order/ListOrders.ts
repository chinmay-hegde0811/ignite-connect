import { DB } from '@ignite/ctintegration-db';
import { App } from '@ignite/ctintegration-do';

export class ListOrders {
  public async execute(payload: App.Types.Ignite.ListOrdersPayload) {
    const paymentOptions = App.CONSTANTS.Constants.getPaymentOptions();
    if (payload.filterOption) {
      if (!paymentOptions.includes(payload.filterOption)) {
        throw { statusCode: 400, message: 'Invalid filter option' };
      }
    }

    return DB.Core.getDBOrders(payload);
  }
}
