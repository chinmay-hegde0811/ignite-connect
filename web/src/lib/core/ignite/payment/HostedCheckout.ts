import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class HostedCheckout {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getHostedCheckoutRequiredProps(request),
    );
    return App.Core.hostedCheckoutSession(
      Web.Mappers.default.getHostedCheckoutAppPayload(request),
    );
  }
}
