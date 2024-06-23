import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class DeleteToken {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getDeleteTokenRequiredProps(request),
    );
    return App.Core.deleteToken(
      Web.Mappers.default.getDeleteTokenAppPayload(request),
    );
  }
}
