import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class CapturePayment {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getCapturePaymentRequiredProps(request),
    );
    return App.Core.capturePayment(
      Web.Mappers.default.getCapturePaymentAppPayload(request),
    );
  }
}
