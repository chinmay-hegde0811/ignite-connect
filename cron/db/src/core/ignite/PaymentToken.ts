import { DB } from '@ignite/ctintegration-do';
import prisma from '../../connection';

export class PaymentToken {
  public async saveCustomerPaymentToken(
    data: DB.Types.Ignite.CreateCustomerPaymentTokenRequest,
  ) {
    return prisma.customer_payment_tokens.create({ data });
  }

  public async getCustomerPaymentToken(id: string) {
    return prisma.customer_payment_tokens.findUnique({
      where: {
        id,
      },
    });
  }

  public async deleteCustomerPaymentTokens(id: string) {
    return prisma.customer_payment_tokens.delete({
      where: {
        id,
      },
    });
  }

  public async getPaymentTokensByCustomerID(customerId: string) {
    return prisma.customer_payment_tokens.findMany({
      where: {
        customerId,
      },
    });
  }
}
