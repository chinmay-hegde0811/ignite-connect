import { CancelPayment } from './ignite/payment/CancelPayment';
import { CreatePayment } from './ignite/payment/CreatePayment';
import { RefundPayment } from './ignite/payment/RefundPayment';
import { RetryPayment } from './ignite/payment/RetryPayment';
import { CapturePayment } from './ignite/payment/CapturePayment';
import { GetOrder } from './ignite/order/GetOrder';
import { DeleteToken } from './ignite/payment/DeleteToken';
import { HostedTokenizationSession } from './ignite/payment/HostedTokenizationSession';
import { ListOrders } from './ignite/order/ListOrders';
import { GetPaymentProducts } from './ignite/payment/GetPaymentProducts';
import { GetPaymentStatus } from './ignite/payment/GetPaymentStatus';
import { Webhook } from './ignite/webhook/Webhook';
import { GetWebhookStatus } from './ignite/webhook/GetWebhookStatus';
import { ValidateCart } from './ignite/cart/ValidateCart';
// import { GetHostedTokenization } from './ignite/payment/GetHostedTokenization';
import { LoadPaymentMethods } from './ignite/payment/LoadPaymentMethods';
import { HostedCheckoutSession } from './ignite/payment/HostedCheckoutSession';
import { TestConnection } from './ignite/payment/TestConnection';
import { CreateOrder } from './ignite/order/CreateOrder';
import { UpdatePayment } from './ignite/payment/UpdatePayment';
import { Cronjob } from './ignite/cron/Cronjob';
import { TransactionQues } from './ignite/transaction/TransactionQue';
import { CreateTransactionQue } from './ignite/webhook/CreateTransactionQue';

export abstract class Ignite {
  public get cancelPayment() {
    return new CancelPayment().execute;
  }

  public get createPayment() {
    return new CreatePayment().execute;
  }

  public get refundPayment() {
    return new RefundPayment().execute;
  }

  public get retryPayment() {
    return new RetryPayment().execute;
  }

  public get capturePayment() {
    return new CapturePayment().execute;
  }

  public get calculateTotalCaptureAmount() {
    return new CapturePayment().calculateTotalCaptureAmount;
  }

  public get deleteToken() {
    return new DeleteToken().execute;
  }

  public get hostedTokenizationSession() {
    return new HostedTokenizationSession().execute;
  }

  public get getPaymentProducts() {
    return new GetPaymentProducts().execute;
  }

  // public get getHostedTokenization() {
  //   return new GetHostedTokenization().execute;
  // }

  public get hostedCheckoutSession() {
    return new HostedCheckoutSession().execute;
  }

  public get loadPaymentMethods() {
    return new LoadPaymentMethods().execute;
  }

  public get getPaymentStatus() {
    return new GetPaymentStatus().execute;
  }

  public get getWebhookStatus() {
    return new GetWebhookStatus().execute;
  }

  public get webhook() {
    return new Webhook().execute;
  }

  public get getOrder() {
    return new GetOrder().execute;
  }

  public get listOrders() {
    return new ListOrders().execute;
  }

  public get validateCart() {
    return new ValidateCart().execute;
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

  public get cronjobs() {
    return new Cronjob().execute;
  }

  public get transactionQues() {
    return new TransactionQues().execute;
  }

  public get createTransactionQues() {
    return new CreateTransactionQue().execute;
  }
}
