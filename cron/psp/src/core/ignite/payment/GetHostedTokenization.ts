import { connectService } from '../client';

export class GetHostedTokenization {
  public async execute() {
    const client = await connectService();
    const result = await client.hostedTokenization.getHostedTokenization();
    // if (result?.body?.errors) {
    //   throw {
    //     message: 'Failed to process the get hosted tokenization service',
    //     statusCode: result.body.errors[0]?.httpStatusCode || 500,
    //     details: result.body.errors,
    //   };
    // }

    return result.body;
  }
}
