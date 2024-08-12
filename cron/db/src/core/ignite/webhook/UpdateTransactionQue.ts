import { Util } from '@ignite/ctintegration-util';
import { DB } from '@ignite/ctintegration-do';
import prisma from '../../../connection';

export class UpdateTransactionQue {
  async execute({
    transactionQueId,
    data,
  }: DB.Types.Ignite.updateTransactionQue) {
    try {
      if (!transactionQueId) {
        throw new Error('Transaction Que not found!');
      }
      return prisma.create_transaction_que.update({
        where: {
          id: transactionQueId,
        },
        data,
      });
    } catch (error) {
      const errorMessage = error as Error;
      Util.Core.logger().error(errorMessage.toString());
      throw error;
    }
  }
}
