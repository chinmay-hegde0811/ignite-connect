import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class CreatePayment {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getCreatePaymentRequiredProps(request),
    );
    return App.Core.createPayment(
      Web.Mappers.default.getCreatePaymentAppPayload(request),
    );
  }
}
