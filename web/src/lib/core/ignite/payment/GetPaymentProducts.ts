import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class GetPaymentProducts {
  public async execute(request: Web.Types.Ignite.Request) {
    const queryString = Web.Mappers.default.getQuery(request);
    Util.Core.hasRequiredParamsInQueryString(
      Web.Mappers.default.getPaymentProductsRequiredProps(queryString),
    );
    return App.Core.getPaymentProducts();
  }
}
