import { ValidateCartController } from './ignite/cart/ValidateCartController';
import { HealthController } from './ignite/health/HealthController';
import { UploadImageController } from './ignite/image/UploadImageController';
import { GetOrderController } from './ignite/order/GetOrderController';
import { ListOrdersController } from './ignite/order/ListOrdersController';
import { CancelPaymentController } from './ignite/payment/CancelPaymentController';
import { CapturePaymentController } from './ignite/payment/CapturePaymentController';
import { CreatePaymentController } from './ignite/payment/CreatePaymentController';
import { DeleteTokenController } from './ignite/payment/DeleteTokenController';
import { GetPaymentProductsController } from './ignite/payment/GetPaymentProductsController';
import { GetPaymentStatusController } from './ignite/payment/GetPaymentStatusController';
import { HostedCheckoutController } from './ignite/payment/HostedCheckoutController';
import { HostedTokenizationController } from './ignite/payment/HostedTokenizationController';
import { LoadPaymentMethodsController } from './ignite/payment/LoadPaymentMethodsController';
import { RefundPaymentController } from './ignite/payment/RefundPaymentController';
import { RetryPaymentController } from './ignite/payment/RetryPaymentController';
import { TestConnectionController } from './ignite/payment/TestConnectionController';
import { GetWebhookStatusController } from './ignite/webhook/GetWebhookStatusController';
import { WebhookController } from './ignite/webhook/WebhookController';
import { CreateOrderController } from './ignite/order/CreateOrderController';
import { UpdatePaymentController } from './ignite/payment/UpdatePayment';

export abstract class Ignite {
  public get validateCart() {
    return new ValidateCartController().processRequest;
  }

  public get healthCheck() {
    return new HealthController().processRequest;
  }

  public get uploadImage() {
    return new UploadImageController().processRequest;
  }

  public get getOrder() {
    return new GetOrderController().processRequest;
  }

  public get listOrders() {
    return new ListOrdersController().processRequest;
  }

  public get cancelPayment() {
    return new CancelPaymentController().processRequest;
  }

  public get capturePayment() {
    return new CapturePaymentController().processRequest;
  }

  public get createPayment() {
    return new CreatePaymentController().processRequest;
  }

  public get deleteToken() {
    return new DeleteTokenController().processRequest;
  }

  public get getPaymentProducts() {
    return new GetPaymentProductsController().processRequest;
  }

  public get getPaymentStatus() {
    return new GetPaymentStatusController().processRequest;
  }

  public get hostedCheckout() {
    return new HostedCheckoutController().processRequest;
  }

  public get hostedTokenization() {
    return new HostedTokenizationController().processRequest;
  }

  public get loadPaymentMethods() {
    return new LoadPaymentMethodsController().processRequest;
  }

  public get refundPayment() {
    return new RefundPaymentController().processRequest;
  }

  public get retryPayment() {
    return new RetryPaymentController().processRequest;
  }

  public get testConnection() {
    return new TestConnectionController().processRequest;
  }

  public get getWebhookStatus() {
    return new GetWebhookStatusController().processRequest;
  }

  public get webhook() {
    return new WebhookController().processRequest;
  }

  public get createOrder() {
    return new CreateOrderController().processRequest;
  }

  public get updatePayment() {
    return new UpdatePaymentController().processRequest;
  }
}
