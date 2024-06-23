import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class UpdatePayment {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getUpdatePaymentRequiredProps(request),
    );

    return App.Core.updatePayment(
      Web.Mappers.default.getUpdatePaymentAppPayload(request),
    );
  }
}
