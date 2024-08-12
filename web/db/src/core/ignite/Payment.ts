import { Prisma } from '@prisma/client';
import { DB } from '@ignite/ctintegration-do';
import prisma from '../../connection';

export class Payment {
  public async getDBOrders(
    query: DB.Types.Ignite.PaymentQueryParams,
  ): Promise<DB.Types.Ignite.GetOrders> {
    // Prepare
    const page = query.page || 1;
    const limit = query.limit || 20;

    const skip = (page - 1) * limit;
    const params = {
      where: {
        ...(query.orderId ? { orderId: query.orderId } : {}),
        ...(query.storeId ? { storeId: query.storeId } : {}),
        ...((query.filterOption
          ? { paymentOption: query.filterOption }
          : {}) as Prisma.paymentsWhereUniqueInput),
      },
    };
    const [totalCount, data] = await Promise.all([
      prisma.payments.count(params),
      prisma.payments.findMany({
        skip,
        take: limit,
        ...params,
        orderBy: { orderCreatedAt: 'desc' },
      }),
    ]);
    return {
      meta: {
        ...query,
        ...{ page },
        ...{ limit },
        totalCount,
      },
      data,
    };
  }

  public async createPaymentInDB(
    data: DB.Types.Ignite.CreatePaymentRequest,
  ): Promise<DB.Types.Ignite.CreatePaymentResponse> {
    const result = await prisma.payments.create({ data });
    return DB.Mappers.default.createPaymentResponseMapper(result);
  }

  public async getIncrementedReference(storeId: string) {
    const INITIAL_REFERENCE = 100000;
    const INITIAL_VERSION = 1;

    return DB.Mappers.default.retry(() =>
      prisma.$transaction(async (tx) => {
        const paymentReference = await tx.payment_references.findFirst({
          where: {
            storeId,
          },
        });

        if (!paymentReference) {
          const created = await tx.payment_references.create({
            data: {
              storeId,
              version: INITIAL_VERSION,
              referenceId: INITIAL_REFERENCE,
            },
          });
          return {
            isRetry: false,
            data: DB.Mappers.default.getIncrementedReferenceMapper(created),
          };
        }

        let { referenceId } = paymentReference;
        const { version } = paymentReference;

        referenceId += 1;

        const newversion = version + 1;

        const updated = await tx.payment_references.update({
          where: {
            id: paymentReference.id,
            storeId,
            version,
          },
          data: {
            referenceId,
            version: newversion,
          },
        });

        if (!updated) {
          return { isRetry: true };
        }

        return {
          isRetry: false,
          data: DB.Mappers.default.getIncrementedReferenceMapper(updated),
        };
      }),
    );
  }

  public async getPayment(where: {
    [key: string]: string;
  }): Promise<DB.Types.Ignite.Payment | null> {
    const payment = await prisma.payments.findFirst({
      where: where as unknown as Prisma.paymentsWhereUniqueInput,
    });
    return payment;
  }

  public async setPayment(
    where: { [key: string]: string | number },
    data: { [key: string]: string | number },
  ): Promise<DB.Types.Ignite.Payment> {
    const result = await prisma.payments.update({
      where: where as unknown as Prisma.paymentsWhereUniqueInput,
      data,
    });
    return result;
  }
}
