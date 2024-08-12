import { connectService } from '../client';

export class DeleteToken {
  public async execute(): Promise<boolean> {
    const client = await connectService();
    const result = await client.tokens.removeToken();
    if (result?.body?.errors) {
      throw {
        message: 'Failed to process the token deletion',
        statusCode: result.body.errors[0]?.httpStatusCode || 500,
        details: result.body.errors,
      };
    }
    return result?.isSuccess;
  }
}
