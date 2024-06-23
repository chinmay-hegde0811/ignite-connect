import { IncomingMessage, ServerResponse } from 'http';

export class HealthController {
  public async processRequest(_request: IncomingMessage, response: ServerResponse) {
    response.end('ok');
  };
}