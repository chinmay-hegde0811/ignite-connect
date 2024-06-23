import { CT } from '@ignite/ctintegration-ct';
import { PSP } from '@ignite/ctintegration-psp';
import { DB } from '@ignite/ctintegration-db';
import { Util } from '@ignite/ctintegration-util';
import { App } from '@ignite/ctintegration-do';

export class DeleteToken {
  public async execute(payload: App.Types.Ignite.DeleteTokenPayload) {
    // Fetch cart from Commercetools to authenticate
    const { cart } = await CT.Core.getMyCart(payload.authToken);
    const { customerPaymentTokenId } = payload;
    if (!cart) {
      throw {
        message: 'Failed to fetch the cart of cart is missing',
        statusCode: 500,
      };
    }

    const customerPaymentToken = await DB.Core.getCustomerPaymentToken(
      customerPaymentTokenId,
    );
    if (!customerPaymentToken) {
      throw {
        message: 'Failed to fetch the payment for token',
        statusCode: 500,
      };
    }

    // Remove psp token
    const hasPspTokenDeleted = await PSP.Core.deleteToken();
    Util.Core.logger().debug('Processed deletion for customer tokens in psp');

    // Remove database token
    const hasDBTokenDeleted = await DB.Core.deleteCustomerPaymentTokens(
      customerPaymentTokenId,
    );

    Util.Core.logger().debug(
      'Processed deletion for customer tokens in database',
    );

    return App.Mappers.default.getDeletedTokenMappedResponse(
      hasDBTokenDeleted,
      hasPspTokenDeleted,
    );
  }
}
