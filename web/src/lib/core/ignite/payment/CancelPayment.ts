import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class CancelPayment {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getCancelPaymentRequiredProps(request),
    );
    return App.Core.cancelPayment(
      Web.Mappers.default.getCancelPaymentAppPayload(request),
    );
  }
}
