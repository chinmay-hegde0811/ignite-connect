export interface ICreateRefundPayload {
  authToken: string;
  orderId: string;
  storeId: string;
  paymentId: string;
  amount: number;
}

export interface ICreateRefundResponse {
  id: string;
  action: string;
}

export interface RefundResult {
  isEqual: boolean;
  isGreater: boolean;
}
