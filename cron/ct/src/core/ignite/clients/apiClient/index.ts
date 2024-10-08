import { env } from 'process';

import { GraphQLClient } from '../graphqlClient';

export class ApiClient {
  gClient: GraphQLClient;

  projectKey: string;

  query!: string;

  variables = {} as { [key: string]: string | number };

  headers = {} as { [key: string]: string };

  constructor() {
    this.gClient = new GraphQLClient();

    this.gClient.setClientWithAuthMiddlewareOptions({
      apiHost: env.CTP_API_URL as string,
      authHost: env.CTP_AUTH_URL as string,
      projectKey: env.CTP_PROJECT_KEY as string,
      clientId: env.CTP_CLIENT_ID as string,
      clientSecret: env.CTP_CLIENT_SECRET as string,
      scopes: [env.CTP_SCOPES] as unknown as Array<string>,
    });

    this.projectKey = env.CTP_PROJECT_KEY as string;
  }

  setBody({
    query,
    variables,
  }: {
    query: string;
    variables: { [key: string]: any };
  }) {
    this.query = query;
    this.variables = variables;
  }

  setAuthHeader(value: string) {
    this.headers.authorization = `Bearer ${value}`;
  }

  async execute() {
    return this.gClient
      .getApiRoot()
      .withProjectKey({ projectKey: this.projectKey })
      .graphql()
      .post({
        body: {
          query: this.query,
          variables: this.variables,
        },
        headers: this.headers,
      })
      .execute()
      .catch((e) => {
        throw {
          statusCode: e.statusCode,
          message: '[CT] Failed to execute the request!',
          details: e.body.errors,
        };
      });
  }
}
