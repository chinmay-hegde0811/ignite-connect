import { IncomingMessage, ServerResponse } from 'http';

type RouteHandler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => Promise<void>;

export type Routes = {
  [key: string]: RouteHandler;
};
