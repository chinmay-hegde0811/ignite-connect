import { Cron } from '@ignite/ctintegration-do';

import CronJob from './ignite/cron/CronJob';

export default abstract class Ignite {
  public context: Cron.Types.Ignite.ContextData = {};

  public get cronJob() {
    this.context.method = 'cron.ignite.CronJob';
    const cronJobInstance = new CronJob();
    return cronJobInstance.execute.bind(cronJobInstance);
  }

  public startScheduler() {
    const cronJobInstance = new CronJob();
    cronJobInstance.startScheduler();
  }
}
