import { Web, App } from '@ignite/ctintegration-do';
import { Util } from '@ignite/ctintegration-util';
import { DB } from '@ignite/ctintegration-db';

export class CreateTransactionQue {
  async execute(data: App.Types.Ignite.Transaction) {
    try {
      const payload = App.Mappers.default.createTransactionQuesParams(data);
      await DB.Core.createTransactionQues(payload);
    } catch (error) {
      const errorMessage = error as Web.Types.Ignite.ErrorProps;
      Util.Core.logger().error(errorMessage.toString());
      throw error;
    }
  }
}
