import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class LoadPaymentMethods {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    const queryString = Web.Mappers.default.getQuery(request);
    Util.Core.hasRequiredParamsInQueryString(
      Web.Mappers.default.getPaymentMethodsRequiredProps(queryString),
    );
    return App.Core.loadPaymentMethods(
      Web.Mappers.default.getPaymentMethodsAppPayload(request, queryString),
    );
  }
}
