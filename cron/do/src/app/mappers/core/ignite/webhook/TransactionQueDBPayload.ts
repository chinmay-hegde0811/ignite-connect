export class TransactionQueDBPayload {
  execute(payload?: any) {
    const transactionId = payload?.transactionId;
    if (!transactionId) {
      throw {
        message: 'Required parameter transactionId is missing',
        statusCode: 500,
      };
    }
    return { transactionId };
  }
}
