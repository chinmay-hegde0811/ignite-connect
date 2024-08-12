import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class RefundPayment {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getRefundPaymentRequiredProps(request),
    );
    return App.Core.refundPayment(
      Web.Mappers.default.getRefundPaymentAppPayload(request),
    );
  }
}
