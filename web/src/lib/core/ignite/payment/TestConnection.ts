import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import { Web } from '@ignite/ctintegration-do';

export class TestConnection {
  public async execute(request: Web.Types.Ignite.Request) {
    Util.Core.logger().debug('[TestConnection] Validation started');
    Util.Core.hasRequiredParamsInBody(
      Web.Mappers.default.getTestConnectionRequiredProps(request),
    );
    Util.Core.logger().debug('[TestConnection] Validation succeded');

    Util.Core.logger().debug('[TestConnection] App process started');
    return App.Core.testConnection();
  }
}
