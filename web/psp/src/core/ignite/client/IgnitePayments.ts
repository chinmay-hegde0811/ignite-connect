import { PSP } from '@ignite/ctintegration-do';

export class IgnitePayments {
  cancelPayment() {
    return { body: { id: '', status: '', errors: [{ httpStatusCode: 200 }] } };
  }

  capturePayment() {
    return { body: { id: '', status: '', errors: [{ httpStatusCode: 200 }] } };
  }

  createPayment() {
    return {
      body: {
        id: '',
        errorId: '',
        merchantAction: {},
        creationOutput: {},
        payment: {},
        status: '',
        errors: [{ httpStatusCode: 200 }],
      },
    } as unknown as PSP.Types.Ignite.CreatedPaymentServiceResponse;
  }

  retryPayment() {
    return { body: { id: '', status: '', errors: [{ httpStatusCode: 200 }] } };
  }

  refundPayment() {
    return { body: { id: '', status: '', errors: [{ httpStatusCode: 200 }] } };
  }

  getPaymentDetails() {
    return {
      body: {
        id: '',
        status: '',
        errors: [{ httpStatusCode: 200 }],
        paymentOutput: {
          amountOfMoney: {
            amount: 100,
            currencyCode: 'USD',
          },
          references: {
            merchantReference: 'merchantReference',
          },
          cardPaymentMethodSpecificOutput: {
            paymentProductId: 12345,
            card: {
              cardNumber: '1111',
              expiryDate: '09/25',
              bin: '1111',
            },
            fraudResults: {
              fraudServiceResult: 'Accept',
            },
            threeDSecureResults: {
              eci: 'eci',
              liability: 'liability',
              authenticationStatus: 'authenticationStatus',
            },
            token: 'token',
          },
          paymentMethod: 'paymentMethod',
        },
        Operations: [
          {
            id: 'id',
            amountOfMoney: {
              amount: 100,
              currencyCode: 'USD',
            },
            status: 'status',
            statusOutput: {
              statusCodeChangeDateTime: 'datettime',
            },
          },
        ],
        redirectPaymentMethodSpecificOutput: {
          paymentProductId: 12345,
          token: 'token',
        },
        statusOutput: {
          isCancellable: false,
          statusCategory: 'statusCategory',
          statusCode: 200,
          isAuthorized: true,
          isRefundable: true,
          errors: [],
        },
      },
    };
  }
}
