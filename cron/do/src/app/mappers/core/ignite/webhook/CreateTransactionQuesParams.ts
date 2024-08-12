import { Ignite } from '../../../../datatypes';

export class CreateTransactionQuesParams {
  execute(transaction: Ignite.Transaction): Ignite.CreateTransactionQuesParams {
    if (!transaction.id || !transaction.status) {
      throw {
        message: 'Required parameter is missing',
        statusCode: 500,
      };
    }
    return {
      status: 0,
      retry: 0,
      transactionId: transaction.id,
      transactionStatus: transaction.status,
      data: transaction.transactionInfo,
    };
  }
}
