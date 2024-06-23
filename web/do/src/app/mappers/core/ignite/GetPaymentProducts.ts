import { Ignite } from '../../../datatypes';

export class GetPaymentProducts {
  public static getPaymentProductsMappedResponse(
    serviceResponse: Ignite.GetPaymentProductsResponse,
  ) {
    const { paymentProducts = [] } = serviceResponse || {};
    return paymentProducts.map((product) => {
      const { id: paymentProductId, displayHints } = product;
      return {
        paymentProductId,
        ...displayHints,
      };
    });
  }
}
