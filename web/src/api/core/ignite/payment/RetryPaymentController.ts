import { ServerResponse } from 'http';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';
import { env } from 'process';
import { Web as Service } from '../../../../lib';

export class RetryPaymentController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      const { method } = request;
      Util.Core.logger().debug(
        `[RetryPayment] Request initiated with method: ${method}`,
      );

      // Only allow POST request; else throw error
      await Util.Core.isPostRequestOrThrowError(method);

      const { NODE_ENV } = env;
      if (NODE_ENV && NODE_ENV === 'production') {
        // Authenticate the session
        await Util.Core.authenticateSession(request, response);
      }

      Util.Core.logger().debug('[RetryPayment] Process started');

      const data = await Service.Core.retryPayment(request);

      Util.Core.logger().debug('[RetryPayment] Process completed');

      Util.Core.setResponseTo200(response, data);
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[RetryPayment] : ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
