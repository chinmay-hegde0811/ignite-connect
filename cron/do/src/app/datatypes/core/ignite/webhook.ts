export interface PaymentPayload {
  payment: {
    paymentOutput: {
      amountOfMoney: {
        amount: number;
        currencyCode: string;
      };
      references: {
        merchantReference: string;
      };
      cardPaymentMethodSpecificOutput: {
        paymentProductId: number;
        card: {
          cardNumber: string;
          expiryDate: string;
          bin: string;
        };
        fraudResults: {
          fraudServiceResult: string;
        };
        threeDSecureResults: {
          eci: string;
          liability: string;
          authenticationStatus: string;
        };
        token: string;
      };
      redirectPaymentMethodSpecificOutput: {
        paymentProductId: number;
        token: string;
      };
      paymentMethod: string;
    };
    status: string;
    statusOutput: {
      errors?: [];
      isCancellable: boolean;
      statusCategory: string;
      statusCode: number;
      isAuthorized: boolean;
      isRefundable: boolean;
    };
    id: string;
  };
  type?: string;
}

export interface RefundPayload {
  refund: {
    refundOutput: {
      amountOfMoney: {
        amount: number;
        currencyCode: string;
      };
      references: {
        merchantReference: string;
      };
      cardPaymentMethodSpecificOutput: {
        totalAmountPaid: number;
        totalAmountRefunded: number;
      };
      paymentMethod: string;
    };
    status: string;
    statusOutput: {
      isCancellable: boolean;
      statusCategory: string;
      statusCode: number;
    };
    id: string;
  };
  type?: string;
}

export interface PaymentDetailsPayload {
  paymentOutput: {
    amountOfMoney: {
      amount: number;
      currencyCode: string;
    };
    references: {
      merchantReference: string;
    };
    cardPaymentMethodSpecificOutput?: {
      paymentProductId: number;
      card: {
        cardNumber: string;
        expiryDate: string;
        bin: string;
      };
      fraudResults: {
        fraudServiceResult: string;
      };
      threeDSecureResults: {
        eci: string;
        liability: string;
        authenticationStatus: string;
      };
      token: string;
    };
    paymentMethod: string;
  };
  Operations: {
    id: string;
    amountOfMoney: {
      amount: number;
      currencyCode: string;
    };
    status: string;
    statusOutput: {
      statusCodeChangeDateTime: string;
    };
  }[];
  status: string;
  statusOutput: {
    isCancellable: boolean;
    statusCategory: string;
    statusCode: number;
    isAuthorized: boolean;
    isRefundable: boolean;
  };
  id: string;
}

export interface TransactionInfo {
  id: string;
  payload: string;
  action: string;
  mock_psp_transactionsId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardDetails {
  cardNumber: string;
  cardType: string;
  isPermanent: boolean;
}

export interface Transaction {
  id: string;
  token: string;
  pspAccountId: string;
  cartTotalAmount: number;
  capturedAmount: number;
  refundedAmount: number;
  voidAmount: number;
  returnUrl: string;
  webhookUrl: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  transactionInfo: TransactionInfo[];
  cardDetails?: CardDetails;
}

export interface CreateTransactionQuesParams {
  status?: number;
  retry?: number;
  transactionId?: string;
  transactionStatus?: string;
  data?: unknown;
}
