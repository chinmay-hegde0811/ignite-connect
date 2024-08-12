import { ServerResponse } from 'http';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';
import { env } from 'process';
import { Web as Service } from '../../../../lib';

export class ListOrdersController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      const { method } = request;

      // Only allow GET request; else throw error
      await Util.Core.isGetRequestOrThrowError(method);

      const { NODE_ENV } = env;
      if (NODE_ENV && NODE_ENV === 'production') {
        // Authenticate the session
        await Util.Core.authenticateSession(request, response);
      }

      const data = await Service.Core.listOrders(request);

      Util.Core.setResponseTo200(response, data);
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[ListOrders] ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
