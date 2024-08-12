import { CONTAINER_NAME } from '../../../components/core/ignite/config/configuration';
import { fetcher } from '../../../services/custom-api-request';

export class GetCustomObject {
  async execute(projectKey, storeId) {
    try {
      const customObject = await fetcher(
        `/proxy/ctp/${projectKey}/custom-objects/${CONTAINER_NAME}/${storeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return customObject;
    } catch (error) {
      console.error('Error custom object:', error.message);
    }
  }
}