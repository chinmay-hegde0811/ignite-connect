import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class RetryPayment {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.logger().debug('[RetryPayment] Validation started');
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getRetryPaymentRequiredProps(request),
    );
    Util.Core.logger().debug('[RetryPayment] Validation succeded');

    Util.Core.logger().debug('[RetryPayment] App process started');
    return App.Core.retryPayment(
      Web.Mappers.default.getRetryPaymentAppPayload(request),
    );
  }
}
