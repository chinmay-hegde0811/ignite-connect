/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { DB } from '@ignite/ctintegration-db';
import { Web, App as DO } from '@ignite/ctintegration-do';
import { Util } from '@ignite/ctintegration-util';
import { PSP } from '@ignite/ctintegration-psp';
import { CT } from '@ignite/ctintegration-ct';
import { Webhook } from '../webhook/Webhook';

export class TransactionQues {
  async execute() {
    let currentQue;
    try {
      const ques = await DB.Core.getTransactionQues();
      for (const que of ques) {
        currentQue = que;
        const payment = await DB.Core.getPayment(
          DO.Mappers.default.transactionQueDBPayload(que),
        );
        if (!payment?.storeId) {
          throw {
            message: "Required parameter 'storeId' is missing or empty",
            statusCode: 500,
          };
        }
        const customConfig = await CT.Core.getCustomObjects(payment.storeId);
        if (!que?.transactionId) {
          throw {
            message: "Required parameter 'transactionId' is missing or empty",
            statusCode: 500,
          };
        }
        const transaction = await PSP.Core.getPayment(
          customConfig,
          que.transactionId,
        );
        const webhookResponse = await new Webhook().execute(transaction);
        if (!webhookResponse) return;
        const data = { status: 1 };
        await DB.Core.updateTransactionQues({
          transactionQueId: que.id,
          data,
        });
      }
    } catch (error) {
      if (currentQue) {
        const data = { status: 2, retry: (currentQue.retry as number) + 1 };
        await DB.Core.updateTransactionQues({
          transactionQueId: currentQue.id,
          data,
        });
        const errorMessage = error as Web.Types.Ignite.ErrorProps;
        Util.Core.logger().error(errorMessage.toString());
        throw error;
      }
    }
  }
}
