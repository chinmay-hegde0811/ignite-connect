import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class GetOrder {
  public async execute(request: Web.Types.Ignite.Request) {
    const queryString = Web.Mappers.default.getQuery(request);
    Util.Core.hasRequiredParamsInQueryString(
      Web.Mappers.default.getOrderRequiredProps(queryString),
    );
    return App.Core.getOrder(
      Web.Mappers.default.getOrderAppPayload(queryString),
    );
  }
}
