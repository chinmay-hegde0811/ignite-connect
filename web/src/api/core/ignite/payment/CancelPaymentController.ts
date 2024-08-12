import { ServerResponse } from 'http';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';
import { Web as Service } from '../../../../lib';

export class CancelPaymentController {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    try {
      const { method } = request;

      // Only allow POST request; else throw error
      await Util.Core.isPostRequestOrThrowError(method);

      const data = await Service.Core.cancelPayment(request);

      Util.Core.setResponseTo200(response, data);
    } catch (e) {
      const error = e as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(`[CancelPayment] : ${JSON.stringify(error)}`);
      Util.Core.setResponseError(response, error);
    }
  }
}
