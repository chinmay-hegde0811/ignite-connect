import { Util } from '@ignite/ctintegration-util';
import { DB } from '@ignite/ctintegration-do';
import prisma from '../../../connection';

export class CreateTransactionQue {
  async execute(data: DB.Types.Ignite.CreateTransactionQue) {
    try {
      return prisma.create_transaction_que.create({
        data,
      });
    } catch (error) {
      const errorMessage = error as Error;
      Util.Core.logger().error(errorMessage.toString());
      throw error;
    }
  }
}
