import { CancelPayment } from './ignite/payment/CancelPayment';
import { CapturePayment } from './ignite/payment/CapturePayment';
import { CreatePayment } from './ignite/payment/CreatePayment';
import { DeleteToken } from './ignite/payment/DeleteToken';
import { GetHostedTokenization } from './ignite/payment/GetHostedTokenization';
import { GetPayment } from './ignite/payment/GetPayment';
import { GetPaymentProducts } from './ignite/payment/GetPaymentProducts';
import { HostedCheckout } from './ignite/payment/HostedCheckout';
import { HostedTokenization } from './ignite/payment/HostedTokenization';
import { RefundPayment } from './ignite/payment/RefundPayment';
import { TestConnection } from './ignite/payment/TestConnection';

export abstract class Ignite {
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

  public get getHostedTokenization() {
    return new GetHostedTokenization().execute;
  }

  public get getPayment() {
    return new GetPayment().execute;
  }

  public get getPaymentProducts() {
    return new GetPaymentProducts().execute;
  }

  public get hostedCheckout() {
    return new HostedCheckout().execute;
  }

  public get hostedTokenization() {
    return new HostedTokenization().execute;
  }

  public get refundPayment() {
    return new RefundPayment().execute;
  }

  public get testConnection() {
    return new TestConnection().execute;
  }
}
