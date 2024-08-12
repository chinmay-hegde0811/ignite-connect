import { Ignite } from '../../../datatypes';

export class GetCustomObjects {
  public static getCustomObjectsResponseMapper(
    response: Ignite.CustomObjectsResponse,
  ) {
    if (response?.body?.errors) {
      throw {
        message: '[CT] Failed to retrieve custom object information',
        details: response?.body?.errors,
        statusCode: 500,
      };
    }

    const result = response?.body?.data?.customObject || {};

    if (!result?.value) {
      throw {
        message: '[CT] Failed to fetch the custom object',
        statusCode: 500,
      };
    }

    const { paymentConfiguration, ...rest } = result.value;
    const {
      projectSettings: {
        account: { environment, test, live },
      },
      paymentMethods,
    } = paymentConfiguration;

    const connectionProps = environment === 'live' ? live : test;

    const config = {
      ...connectionProps,
      paymentConfiguration,
      ...paymentMethods,
      ...rest,
    } as Ignite.CustomObjects;

    return config;
  }
}
