import { CONTAINER_NAME } from '../../../components/core/ignite/config/configuration';
import { fetcher } from '../../../services/custom-api-request';

export class CreateCustomObject {
  async execute(payload, projectKey) {
    try {
      const customObject = await fetcher(
        `/proxy/ctp/${projectKey}/custom-objects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      return customObject;
    } catch (error) {
      console.error('Error creating custom object:', error.message);
    }
  }
}