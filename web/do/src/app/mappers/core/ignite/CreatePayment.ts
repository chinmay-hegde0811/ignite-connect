import { Cart } from '@commercetools/platform-sdk';
import { $Enums } from '@prisma/client';
import Constants from '../../../constants';
import { Ignite } from '../../../datatypes';

const getFormattedPaymentId = (
  merchantReference: string,
  referenceId: number,
) => `${merchantReference}-${referenceId.toString()}`;

export class CreatePayment {
  public static getServicePayload(
    payload: Ignite.ICreatePaymentPayload,
    cart: Cart,
    customConfig: Ignite.ConnectionProps,
  ) {
    const cartTotalAmount = cart.taxedPrice?.totalGross?.centAmount || 0;
    const currency = cart.taxedPrice?.totalGross?.currencyCode || 'EUR';
    const { webhookUrl, token, returnUrl } = payload;
    const { authorizationMode } = customConfig;

    return {
      cartTotalAmount,
      currency,
      paymentAction: authorizationMode,
      webhookUrl,
      token,
      returnUrl,
    };
  }

  public static getDatabasePayload({
    customConfig,
    reference,
    cart,
    payload,
    payment,
    isHostedCheckout,
    isHostedTokenization,
    hostedTokenizationResponse,
    orderId,
  }: {
    customConfig: Ignite.CustomObjects;
    reference: { referenceId: number };
    cart: Cart;
    payload: { storeId: string; hostedTokenizationId?: string; token?: string };
    payment?: {
      transactionId: string;
    };
    isHostedCheckout?: boolean;
    isHostedTokenization?: boolean;
    hostedTokenizationResponse?: Ignite.GetHostedTokenizationResponse;
    orderId?: string;
  }) {
    const { merchantReference, authorizationMode } = customConfig;
    const cartId = cart.id;
    const { storeId, hostedTokenizationId, token } = payload;
    const currency = cart.taxedPrice?.totalGross.currencyCode || 'EUR';
    const total = cart.taxedPrice?.totalGross.centAmount || 0;
    const { transactionId = '' } = payment || {};

    let paymentOption;

    if (isHostedCheckout) {
      paymentOption = Constants.getRedirectPSPOption();
    }
    if (isHostedTokenization) {
      paymentOption = Constants.getPSPCreditCardOption();
    }

    // Concat with the merchant reference
    const paymentId = getFormattedPaymentId(
      merchantReference,
      reference.referenceId,
    );

    const storePermanently = !hostedTokenizationResponse?.token?.isTemporary;

    const databasePayload = {
      authMode: authorizationMode as $Enums.Modes,
      paymentOption: paymentOption as $Enums.PaymentOptions,
      paymentId,
      storeId,
      cartId,
      orderId: '',
      hostedTokenizationId,
      token,
      storePermanently,
      transactionId,
      currency,
      total,
    };

    if (orderId) {
      databasePayload.orderId = orderId;
    }

    return databasePayload;
  }

  public static getCreatedPaymentMappedResponse(
    customConfig: Ignite.CustomObjects,
    reference: { referenceId: number },
    payment: Ignite.ICreatePaymentResponse,
    dbPayment: { id: string },
  ) {
    const { merchantReference } = customConfig;

    // Concat with the merchant reference
    const orderPaymentId = getFormattedPaymentId(
      merchantReference,
      reference.referenceId,
    );
    const { transactionId = '', action = '', backUrl = '' } = payment || {};

    const { id = '' } = dbPayment || {};

    return {
      id,
      transactionId,
      orderPaymentId,
      action,
      backUrl,
    };
  }

  public static getHostedTokenizationPayload(
    payload: Ignite.ICreatePaymentPayload,
  ) {
    const { storeId } = payload;
    return {
      storeId,
    };
  }
}
