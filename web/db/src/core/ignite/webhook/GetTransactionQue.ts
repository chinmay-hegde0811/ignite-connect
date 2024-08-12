import { Util } from '@ignite/ctintegration-util';
import prisma from '../../../connection';

export class GetTransactionQue {
  async execute() {
    try {
      const retryCount = parseInt(process.env.RETRY_COUNT ?? '2', 10);
      return prisma.create_transaction_que.findMany({
        where: {
          OR: [
            { status: 0 },
            {
              AND: [{ status: 2 }, { retry: { lt: retryCount } }],
            },
          ],
        },
      });
    } catch (error) {
      const errorMessage = error as Error;
      Util.Core.logger().error(errorMessage.toString());
      throw error;
    }
  }
}
