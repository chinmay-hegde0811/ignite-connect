import { Util } from '@ignite/ctintegration-util';
import { connectService } from '../client';

export class GetPaymentProducts {
  public async execute() {
    const client = await connectService();

    const result = await client.products.getPaymentProducts();

    if (result?.body?.errors) {
      Util.Core.logger().error(
        `[GetPaymentProducts] Failed to process the service: ${JSON.stringify(
          result?.body?.errors,
        )}`,
      );
      throw {
        message: 'Failed to process the get payment products service',
        statusCode: result.body.errors[0]?.httpStatusCode || 500,
        details: result.body.errors,
      };
    }

    return result.body;
  }
}
