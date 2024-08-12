import cron, { ScheduledTask } from 'node-cron';
import { Util } from '@ignite/ctintegration-util';

export default class CronScheduler {
  private cronJob: ScheduledTask | null;

  constructor(
    private cronSchedule: string,
    private cronTask: () => Promise<void>,
  ) {
    this.cronJob = null;
  }

  public start(): void {
    this.cronJob = cron.schedule(this.cronSchedule, this.cronTask);
    this.cronJob.start();
    this.cronJob.on('error', (error: Error) => {
      Util.Core.logger().error(error.toString());
    });
    this.cronJob.on('stopped', () => {
      Util.Core.logger().error('Cron job stopped');
    });
  }
}
