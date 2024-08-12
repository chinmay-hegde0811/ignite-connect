import { DB } from '@ignite/ctintegration-db';

export class Cronjob {
  async execute() {
    return DB.Core.getCronJobs();
  }
}
