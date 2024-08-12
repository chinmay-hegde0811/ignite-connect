import { env } from 'process';
import { CT } from '@ignite/ctintegration-do';
import { ApiClient } from '../clients/apiClient';
import { GET_CUSTOM_OBJECTS_QUERY } from '../query/constants';
import { Cache } from '../cache/index';

export class GetCustomObjects {
  public async execute(
    storeId: string,
  ): Promise<CT.Types.Ignite.CustomObjects> {
    // Fetch from cache
    if (env.ENABLE_CACHE === 'true') {
      const cache = await new Cache().getCustomObjectsCache(storeId);
      if (cache) {
        return cache;
      }
    }

    // Initialize api client
    const apiClient = new ApiClient();

    const variables = {
      containerName: CT.CONSTANTS.Constants.CUSTOM_OBJECT.CONTAINER_NAME,
      key: storeId,
    };

    apiClient.setBody({
      query: GET_CUSTOM_OBJECTS_QUERY,
      variables,
    });

    const response =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.CustomObjectsResponse;

    const configuration =
      CT.Mappers.default.getCustomObjectsResponseMapper(response);

    return configuration;
  }
}
