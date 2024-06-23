import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';
import { Web } from '@ignite/ctintegration-do';
import { env } from 'process';
import { ServerResponse } from 'http';
import { LoggerUtil } from './LoggerUtil';

export class AuthenticateSession {
  public async processRequest(
    request: Web.Types.Ignite.Request,
    response: ServerResponse,
  ) {
    const { APP_DOMAIN } = env;
    try {
      if (!APP_DOMAIN) {
        LoggerUtil.logger().error(
          'Environment variable APP_DOMAIN is not defined',
        );
        throw {
          statusCode: 500,
          message:
            'Failed to fetch the configuration for createSessionAuthVerifier request',
        };
      }
      const sessionAuthVerifier = createSessionAuthVerifier({
        audience: APP_DOMAIN,
        issuer: CLOUD_IDENTIFIERS.GCP_EU,
      });
      await sessionAuthVerifier(request, response);
    } catch (error) {
      LoggerUtil.logger().error(
        `Unauthorized request to the API ${APP_DOMAIN}. Error: ${JSON.stringify(
          error,
        )}`,
      );
      throw { statusCode: 401, message: 'Unauthorized request' };
    }
  }
}
