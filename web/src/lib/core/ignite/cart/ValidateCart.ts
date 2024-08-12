import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class ValidateCart {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    return App.Core.validateCart(
      Web.Mappers.default.getValidateCartAppPayload(request),
    );
  }
}
