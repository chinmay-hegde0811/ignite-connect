import { connectService } from '../client';

export class TestConnection {
  public async execute(): Promise<boolean> {
    const client = await connectService();
    const result = await client.services.testConnection();

    if (result?.body?.errors) {
      throw {
        message: 'Failed to process the test connection',
        statusCode: result.body.errors[0]?.httpStatusCode || 500,
        details: result.body.errors,
      };
    }

    return !!result?.isSuccess;
  }
}
