import { CT } from '@ignite/ctintegration-do';
import { MeApiClient } from '../clients/meApiClient';
import { GET_MY_CUSTOM_OBJECT_QUERY } from '../query/constants';

export class GetMyCustomObjects {
  public async execute(
    authToken: string,
    storeId: string,
  ): Promise<CT.Types.Ignite.CustomObjects> {
    // Initialize me client
    const apiClient = new MeApiClient({ authToken });

    const variables = {
      containerName: CT.CONSTANTS.Constants.CUSTOM_OBJECT.CONTAINER_NAME,
      key: storeId,
    };

    apiClient.setBody({
      query: GET_MY_CUSTOM_OBJECT_QUERY,
      variables,
    });

    const response =
      (await apiClient.execute()) as unknown as CT.Types.Ignite.CustomObjectsResponse;

    const configuration =
      CT.Mappers.default.getCustomObjectsResponseMapper(response);

    return configuration;
  }
}
