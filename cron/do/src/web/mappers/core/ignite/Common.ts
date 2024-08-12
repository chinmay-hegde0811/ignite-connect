import { Ignite } from '../../../datatypes';

export class Common {
  public static getQuery(request: Ignite.Request): Ignite.QueryParams {
    if (!request.url) {
      throw {
        message: 'Exception occured while fetching the query parameter',
        statusCode: 500,
      };
    }
    const url = new URL(request.url, `https://${request.headers.host}`);
    return Object.fromEntries(url.searchParams.entries());
  }

  public static pick<Data extends object, Keys extends keyof Data>(
    data: Data,
    keys: Keys[],
  ): Pick<Data, Keys> {
    const result = {} as Pick<Data, Keys>;

    keys.forEach((key) => {
      result[key] = data[key];
    });

    return result;
  }
}
