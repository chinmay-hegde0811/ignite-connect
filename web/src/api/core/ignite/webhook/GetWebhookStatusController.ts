import { ServerResponse } from 'http';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';
import { Web as Service } from '../../../../lib';

export class GetWebhookStatusController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      // Only allow GET request; else throw error
      await Util.Core.isGetRequestOrThrowError(request.method);

      const data = await Service.Core.getWebookStatus(request);

      Util.Core.setResponseTo200(response, data);
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[GetWebhookStatus] : ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
