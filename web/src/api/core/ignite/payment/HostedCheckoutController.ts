import { ServerResponse } from 'http';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';
import { Web as Service } from '../../../../lib';

export class HostedCheckoutController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      const { method } = request;
      Util.Core.logger().debug(
        `[InitHostedCheckout] Request initiated with method: ${method}`,
      );

      // Only allow POST request; else throw error
      await Util.Core.isPostRequestOrThrowError(method);

      Util.Core.logger().debug('[InitHostedCheckout] Process started');

      const data = await Service.Core.hostedCheckout(request);

      Util.Core.logger().debug('[InitHostedCheckout] Process completed');

      Util.Core.setResponseTo200(response, data);
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[HostedCheckout] : ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
