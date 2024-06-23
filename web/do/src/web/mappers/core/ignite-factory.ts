import { CancelPayment } from './ignite/CancelPayment';
import { CapturePayment } from './ignite/CapturePayment';
import { Common } from './ignite/Common';
import { CreatePayment } from './ignite/CreatePayment';
import { DeleteToken } from './ignite/DeleteToken';
import { GetOrder } from './ignite/GetOrder';
import { GetPaymentProducts } from './ignite/GetPaymentProducts';
import { GetPaymentStatus } from './ignite/GetPaymentStatus';
import { GetWebhookStatus } from './ignite/GetWebhookStatus';
import { HostedCheckout } from './ignite/HostedCheckout';
import { InitiatePayment } from './ignite/InitiatePayment';
import { ListOrders } from './ignite/ListOrders';
import { LoadPaymentMethods } from './ignite/LoadPaymentMethods';
import { RefundPayment } from './ignite/RefundPayment';
import { TestConnection } from './ignite/TestConnection';
import { ValidateCart } from './ignite/ValidateCart';
import { Webhook } from './ignite/Webhook';
import { RetryPayments } from './ignite/RetryPayment';
import { CreateOrder } from './ignite/CreateOrder';
import { UpdatePayment } from './ignite/UpdatePayment';

export abstract class Ignite {
  public get getCancelPaymentRequiredProps() {
    return CancelPayment.getCancelPaymentRequiredProps;
  }

  public get getCancelPaymentAppPayload() {
    return CancelPayment.getCancelPaymentAppPayload;
  }

  public get getCapturePaymentRequiredProps() {
    return CapturePayment.getCapturePaymentRequiredProps;
  }

  public get getCapturePaymentAppPayload() {
    return CapturePayment.getCapturePaymentAppPayload;
  }

  public get getQuery() {
    return Common.getQuery;
  }

  public get pick() {
    return Common.pick;
  }

  public get getCreatePaymentRequiredProps() {
    return CreatePayment.getCreatePaymentRequiredProps;
  }

  public get getCreatePaymentAppPayload() {
    return CreatePayment.getCreatePaymentAppPayload;
  }

  public get getDeleteTokenRequiredProps() {
    return DeleteToken.getDeleteTokenRequiredProps;
  }

  public get getDeleteTokenAppPayload() {
    return DeleteToken.getDeleteTokenAppPayload;
  }

  public get getOrderRequiredProps() {
    return GetOrder.getOrderRequiredProps;
  }

  public get getOrderAppPayload() {
    return GetOrder.getOrderAppPayload;
  }

  public get getPaymentProductsRequiredProps() {
    return GetPaymentProducts.getPaymentProductsRequiredProps;
  }

  public get getPaymentProductsPayload() {
    return GetPaymentProducts.getPaymentProductsPayload;
  }

  public get getPaymentStatusRequiredProps() {
    return GetPaymentStatus.getPaymentStatusRequiredProps;
  }

  public get getPaymentStatusAppPayload() {
    return GetPaymentStatus.getPaymentStatusAppPayload;
  }

  public get getWebhookStatusRequiredProps() {
    return GetWebhookStatus.getWebhookStatusRequiredProps;
  }

  public get getWebhookStatusAppPayload() {
    return GetWebhookStatus.getWebhookStatusAppPayload;
  }

  public get getHostedCheckoutRequiredProps() {
    return HostedCheckout.getHostedCheckoutRequiredProps;
  }

  public get getHostedCheckoutAppPayload() {
    return HostedCheckout.getHostedCheckoutAppPayload;
  }

  public get getInitSessionRequiredProps() {
    return InitiatePayment.getInitSessionRequiredProps;
  }

  public get getInitSessionAppPayload() {
    return InitiatePayment.getInitSessionAppPayload;
  }

  public get getListOrdersRequiredProps() {
    return ListOrders.getListOrdersRequiredProps;
  }

  public get getListOrdersAppPayload() {
    return ListOrders.getListOrdersAppPayload;
  }

  public get getPaymentMethodsRequiredProps() {
    return LoadPaymentMethods.getPaymentMethodsRequiredProps;
  }

  public get getPaymentMethodsAppPayload() {
    return LoadPaymentMethods.getPaymentMethodsAppPayload;
  }

  public get getRefundPaymentRequiredProps() {
    return RefundPayment.getRefundPaymentRequiredProps;
  }

  public get getRefundPaymentAppPayload() {
    return RefundPayment.getRefundPaymentAppPayload;
  }

  public get getRetryPaymentRequiredProps() {
    return RetryPayments.getRetryPaymentRequiredProps;
  }

  public get getRetryPaymentAppPayload() {
    return RetryPayments.getRetryPaymentAppPayload;
  }

  public get getTestConnectionRequiredProps() {
    return TestConnection.getTestConnectionRequiredProps;
  }

  public get testConnectionAppPayload() {
    return TestConnection.testConnectionAppPayload;
  }

  public get getValidateCartAppPayload() {
    return ValidateCart.getValidateCartAppPayload;
  }

  public get getWebhookAppPayload() {
    return Webhook.getWebhookAppPayload;
  }

  public get getCreateOrderAppPayload() {
    return CreateOrder.getCreateOrderAppPayload;
  }

  public get getCreateOrderRequiredProps() {
    return CreateOrder.getCreateOrderRequiredProps;
  }

  public get getUpdatePaymentAppPayload() {
    return UpdatePayment.getUpdatePaymentAppPayload;
  }

  public get getUpdatePaymentRequiredProps() {
    return UpdatePayment.getUpdatePaymentRequiredProps;
  }
}
