import { ValidateCart } from './ignite/cart/ValidateCart';
import { GetOrder } from './ignite/order/GetOrder';
import { ListOrders } from './ignite/order/ListOrders';
import { CancelPayment } from './ignite/payment/CancelPayment';
import { CapturePayment } from './ignite/payment/CapturePayment';
import { CreatePayment } from './ignite/payment/CreatePayment';
import { DeleteToken } from './ignite/payment/DeleteToken';
import { GetPaymentProducts } from './ignite/payment/GetPaymentProducts';
import { GetPaymentStatus } from './ignite/payment/GetPaymentStatus';
import { HostedCheckout } from './ignite/payment/HostedCheckout';
import { HostedTokenization } from './ignite/payment/HostedTokenization';
import { LoadPaymentMethods } from './ignite/payment/LoadPaymentMethods';
import { RefundPayment } from './ignite/payment/RefundPayment';
import { RetryPayment } from './ignite/payment/RetryPayment';
import { TestConnection } from './ignite/payment/TestConnection';
import { GetWebhookStatus } from './ignite/webhook/GetWebhookStatus';
import { Webhook } from './ignite/webhook/Webhook';
import { CreateOrder } from './ignite/order/CreateOrder';
import { UpdatePayment } from './ignite/payment/UpdatePayment';

export abstract class Ignite {
  public get validateCart() {
    return new ValidateCart().execute;
  }

  public get getOrder() {
    return new GetOrder().execute;
  }

  public get listOrders() {
    return new ListOrders().execute;
  }

  public get cancelPayment() {
    return new CancelPayment().execute;
  }

  public get capturePayment() {
    return new CapturePayment().execute;
  }

  public get createPayment() {
    return new CreatePayment().execute;
  }

  public get deleteToken() {
    return new DeleteToken().execute;
  }

  public get getPaymentProducts() {
    return new GetPaymentProducts().execute;
  }

  public get getPaymentStatus() {
    return new GetPaymentStatus().execute;
  }

  public get hostedCheckout() {
    return new HostedCheckout().execute;
  }

  public get hostedTokenization() {
    return new HostedTokenization().execute;
  }

  public get loadPaymentMethods() {
    return new LoadPaymentMethods().execute;
  }

  public get refundPayment() {
    return new RefundPayment().execute;
  }

  public get retryPayment() {
    return new RetryPayment().execute;
  }

  public get getWebookStatus() {
    return new GetWebhookStatus().execute;
  }

  public get webhook() {
    return new Webhook().execute;
  }

  public get testConnection() {
    return new TestConnection().execute;
  }

  public get createOrder() {
    return new CreateOrder().execute;
  }

  public get updatePayment() {
    return new UpdatePayment().execute;
  }
}
