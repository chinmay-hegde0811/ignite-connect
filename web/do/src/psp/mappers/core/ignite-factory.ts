import { CreatePayment } from './ignite/CreatePayment';
import { HostedCheckout } from './ignite/HostedCheckout';
import { HostedTokenization } from './ignite/HostedTokenization';

export abstract class Ignite {
  public get getCreatePaymentMappedResponse() {
    return CreatePayment.getCreatePaymentMappedResponse;
  }

  public get getFormattedHostedCheckoutResult() {
    return HostedCheckout.getFormattedHostedCheckoutResult;
  }

  public get getFormattedHostedTokenizationResult() {
    return HostedTokenization.getFormattedHostedTokenizationResult;
  }
}
