import { App } from '@ignite/ctintegration-app';
import { Web } from '@ignite/ctintegration-do';

export class Webhook {
  public async execute(request: Web.Types.Ignite.Request) {
    // Pass webhook request to the app
    const { payload } = Web.Mappers.default.getWebhookAppPayload(request);
    switch (payload.status) {
      default:
        return App.Core.createTransactionQues(payload);
    }
  }
}
