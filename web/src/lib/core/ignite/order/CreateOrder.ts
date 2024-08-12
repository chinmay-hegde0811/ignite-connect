import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class CreateOrder {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getCreateOrderRequiredProps(request),
    );
    return App.Core.createOrder(
      Web.Mappers.default.getCreateOrderAppPayload(request),
    );
  }
}
