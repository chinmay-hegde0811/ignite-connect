import { App } from '@ignite/ctintegration-app';
import { Web } from '@ignite/ctintegration-do';

export class Webhook {
  public async execute(request: Web.Types.Ignite.Request) {
    // Pass webhook request to the app
    const webhookAppPayload = Web.Mappers.default.getWebhookAppPayload(request);
    return App.Core.webhook(webhookAppPayload.payload);
  }
}
