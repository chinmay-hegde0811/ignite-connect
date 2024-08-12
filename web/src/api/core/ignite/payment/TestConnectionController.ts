import { ServerResponse } from 'http';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';
import { env } from 'process';
import { Web as Service } from '../../../../lib';

export class TestConnectionController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      const { method } = request;
      Util.Core.logger().debug(
        `[TestConnection] Request initiated with method: ${method}`,
      );

      // Only allow POST request; else throw error
      await Util.Core.isPostRequestOrThrowError(method);

      const { NODE_ENV } = env;
      if (NODE_ENV && NODE_ENV === 'production') {
        // Authenticate the session
        await Util.Core.authenticateSession(request, response);
      }

      Util.Core.logger().debug('[TestConnection] Process started');

      const connection = await Service.Core.testConnection(request);

      Util.Core.logger().debug('[TestConnection] Process completed');

      Util.Core.setResponseTo200(response, { connection });
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[TestConnection] : ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
