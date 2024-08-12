import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class HostedTokenization {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasAuthHeaderOrThrowError(request);
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getInitSessionRequiredProps(request),
    );
    return App.Core.hostedTokenizationSession(
      Web.Mappers.default.getInitSessionAppPayload(request),
    );
  }
}
