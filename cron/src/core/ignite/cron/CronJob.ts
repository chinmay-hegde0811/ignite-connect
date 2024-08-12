import { App } from '@ignite/ctintegration-app';
import { Util } from '@ignite/ctintegration-util';
import dotenv from 'dotenv';
import CronScheduler from './CronScheduler';

// Load environment variables from .env file
dotenv.config();

export default class CronJob {
  private cronScheduler: CronScheduler;

  constructor() {
    const cronSchedule = process.env.CRON_SCHEDULE || '* * * * *';
    this.cronScheduler = new CronScheduler(
      cronSchedule,
      this.cronTask.bind(this),
    );
  }

  private async getCronJobs() {
    return App.Core.cronjobs();
  }

  public async cronTask() {
    try {
      // eslint-disable-next-line no-console
      console.log('Executing cron job:');
      const allCronJobs = await this.getCronJobs();
      allCronJobs.map(async (job) => {
        Util.Core.logger().debug(`Executing cron job: ${job.name}`);

        switch (job.name.toLowerCase()) {
          case 'create_transaction':
            await App.Core.transactionQues();
            break;
          default:
            Util.Core.logger().error(`Unhandled cron job ${job.name}!`);
            break;
        }
      });
    } catch (error) {
      Util.Core.logger().error((error as Error).toString());
    }
  }

  public startScheduler(): void {
    this.cronScheduler.start();
  }

  public async execute(): Promise<void> {
    await this.cronTask();
  }
}
