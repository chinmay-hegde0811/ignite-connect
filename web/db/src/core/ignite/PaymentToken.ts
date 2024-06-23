import { Util } from '@ignite/ctintegration-util';
import { DB } from '@ignite/ctintegration-do';
import prisma from '../../connection';

export class PaymentToken {
  public async saveCustomerPaymentToken(
    data: DB.Types.Ignite.CreateCustomerPaymentTokenRequest,
  ) {
    try {
      return prisma.customer_payment_tokens.create({ data });
    } catch (error) {
      Util.Core.logger().debug(
        `Exception occured for save customer payment token: ${JSON.stringify(
          error,
        )}`,
      );
      throw {
        message: 'Exception occured for save customer payment token',
        statusCode: 500,
        details: (error as { message: string }).message,
      };
    }
  }

  public async getCustomerPaymentToken(id: string) {
    try {
      return prisma.customer_payment_tokens.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      Util.Core.logger().debug(
        `Exception occured for fetching the customer payment token: ${JSON.stringify(
          error,
        )}`,
      );
      throw {
        message: 'Exception occured for fetching the customer payment token',
        statusCode: 500,
        details: (error as { message: string }).message,
      };
    }
  }

  public async deleteCustomerPaymentTokens(id: string) {
    try {
      return prisma.customer_payment_tokens.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      Util.Core.logger().debug(
        `Exception occured for delete the customer payment token: ${JSON.stringify(
          error,
        )}`,
      );
      throw {
        message: 'Exception occured for delete the customer payment token',
        statusCode: 500,
        details: (error as { message: string }).message,
      };
    }
  }

  public async getPaymentTokensByCustomerID(customerId: string) {
    try {
      return await prisma.customer_payment_tokens.findMany({
        where: {
          customerId,
        },
      });
    } catch (error) {
      throw {
        message: 'Exception occured for fetching the customer payment token',
        statusCode: 500,
        details: (error as { message: string }).message,
      };
    }
  }
}
