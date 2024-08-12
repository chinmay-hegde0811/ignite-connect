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

interface TransactionInfo {
  id: string;
  payload: string;
  action: string;
  mock_psp_transactionsId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CardDetails {
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
  cardDetails: CardDetails;
}
