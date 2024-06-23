import { Order } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { App } from '@ignite/ctintegration-do';

export class CommonMethods {
  protected async _getPayment(
    customConfig: App.Types.Ignite.ConnectionProps,
    transactionId: string,
  ) {
    return PSP.Core.getPayment(customConfig, transactionId);
  }

  protected _hasValidAmount(order: Order, amount: number) {
    return App.Mappers.default.hasValidAmount(order, amount);
  }

  protected _calculateRemainingOrderAmount(order: Order, amount: number) {
    return App.Mappers.default.calculateRemainingOrderAmount(order, amount);
  }
}
