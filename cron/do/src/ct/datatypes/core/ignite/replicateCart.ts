import { Cart, ErrorObject } from '@commercetools/platform-sdk';

export interface ReplicateCartPayload {
  cartId: string;
}

export interface ReplicateCartResponse {
  body: {
    data: {
      replicateCart: Cart;
    };
    errors: ErrorObject;
  };
}
