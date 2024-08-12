import { $Enums } from '@prisma/client';

export interface Payment {
  id: string;
  paymentId: string;
  pspId: string | null;
  transactionId: string;
  token: string | null;
  storeId: string;
  cartId: string;
  orderId: string;
  status: $Enums.Status;
  state: $Enums.States;
  storePermanently: boolean;
  errors: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaymentQueryParams {
  page?: number;
  limit?: number;
  filterOption?: string;
  orderId?: string;
  storeId?: string;
}

export interface PaymentReference {
  id: string;
  storeId: string;
  version: number;
  referenceId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
  authMode: $Enums.Modes;
  paymentOption: $Enums.PaymentOptions;
  hostedTokenizationId?: string | null;
  paymentId: string;
  pspId?: string | null;
  pspStatus?: string | null;
  pspStatusCode?: number;
  transactionId: string;
  token?: string | null;
  storeId: string;
  cartId: string;
  orderId: string;
  orderCreatedAt?: Date;
  currency: string;
  total: number;
  status?: $Enums.Status;
  state?: $Enums.States;
}

export interface CreatePaymentResponse {
  id: string;
  paymentId: string;
  orderId: string;
  status: $Enums.Status;
  state: $Enums.States;
}

export interface GetOrders {
  meta: {
    orderId?: string;
    page?: number;
    totalCount: number;
  };
  data: Payment[];
}
