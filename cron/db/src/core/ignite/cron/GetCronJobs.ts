import { Util } from '@ignite/ctintegration-util';
import prisma from '../../../connection';

export class GetCronJobs {
  async execute() {
    try {
      return prisma.cron_jobs.findMany({
        where: {
          status: 1,
        },
      });
    } catch (error) {
      const errorMessage = error as Error;
      Util.Core.logger().error(errorMessage.toString());
      throw error;
    }
  }
}
