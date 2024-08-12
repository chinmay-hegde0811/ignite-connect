import { PSP } from '@ignite/ctintegration-psp';
import { App } from '@ignite/ctintegration-do';

export class GetPaymentProducts {
  public async execute() {
    // Todo: will handle the authentication

    // Prepare service payload for get payment status
    const serviceResponse = await PSP.Core.getPaymentProducts();
    return App.Mappers.default.getPaymentProductsMappedResponse({
      paymentProducts: serviceResponse.paymentProducts,
    } as App.Types.Ignite.GetPaymentProductsResponse);
  }
}
