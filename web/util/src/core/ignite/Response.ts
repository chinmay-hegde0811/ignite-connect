import { ServerResponse } from 'http';
import { Headers } from './Headers';

const StatusCodes = {
  OK: 200,
  CREATED: 201,
};

export class ResponseManager extends Headers {
  headers = {
    'Content-Type': 'application/json',
  };

  public setResponseTo200<T>(response: ServerResponse, params?: T) {
    response.writeHead(StatusCodes.OK, {
      ...this.headers,
      ...Headers.cors(),
    });
    response.end(
      JSON.stringify({
        statusCode: StatusCodes.OK,
        result: params,
      }),
    );
  }

  public setResponseTo201<T>(response: ServerResponse, params?: T) {
    response.writeHead(StatusCodes.CREATED, {
      ...this.headers,
      ...Headers.cors(),
    });
    response.end(
      JSON.stringify({
        statusCode: StatusCodes.CREATED,
        result: params,
      }),
    );
  }

  public setResponseError(
    response: ServerResponse,
    error: {
      statusCode: number;
      message: string;
      details?: string;
    },
  ) {
    const { statusCode = 500, message, details = undefined } = error;
    response.writeHead(statusCode, {
      ...this.headers,
      ...Headers.cors(),
    });

    response.end(
      JSON.stringify({
        status: 'nok',
        statusCode,
        message,
        details,
      }),
    );
  }

  public setResponseToEmpty(response: ServerResponse) {
    response.writeHead(StatusCodes.OK, {
      ...this.headers,
      ...Headers.cors(),
    });
    response.end();
  }

  public setResponse<T>(response: ServerResponse, params?: T) {
    response.writeHead(StatusCodes.OK, {
      ...this.headers,
      ...Headers.cors(),
    });
    response.end(JSON.stringify(params));
  }
}
