import { ServerResponse } from 'http';
import { Web } from '@ignite/ctintegration-do';
import { Api } from '../../../../api';

export class GetPaymentStatusRoute {
  public async route(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    return Api.Core.getPaymentStatus(request, response);
  }
}
