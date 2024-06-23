import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class GetWebhookStatus {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    const queryString = Web.Mappers.default.getQuery(request);
    Util.Core.hasRequiredParamsInQueryString(
      Web.Mappers.default.getWebhookStatusRequiredProps(queryString),
    );
    return App.Core.getWebhookStatus(
      Web.Mappers.default.getWebhookStatusAppPayload(request, queryString),
    );
  }
}
