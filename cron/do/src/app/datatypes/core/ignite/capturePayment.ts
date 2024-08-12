export interface ICapturePaymentPayload {
  authToken: string;
  storeId: string;
  orderId: string;
  paymentId: string;
  amount: number;
}

export interface Payment {
  id: string;
  paymentId: string;
  pspId: string | null;
  transactionId: string;
  token: string | null;
  storeId: string;
  cartId: string;
  orderId: string;
  status: string;
  state: string;
  storePermanently: boolean;
  errors: string | null;
  createdAt: Date;
  updatedAt: Date;
}
