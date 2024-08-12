// import { ServerResponse } from 'http';
// import { Web } from '@ignite/ctintegration-do';
import { ValidateCartControllerRoute } from './ignite/cart/ValidateCart';
import { HealthControllerRoute } from './ignite/health/HealthCheck';
import { UploadImageRoute } from './ignite/image/UploadImage';
import { CreateOrderRoute } from './ignite/order/CreateOrder';
import { GetOrderRoute } from './ignite/order/GetOrder';
import { ListOrdersRoute } from './ignite/order/ListOrder';
import { CancelPaymentRoute } from './ignite/payment/CancelPayment';
import { CapturePaymentRoute } from './ignite/payment/CapturePayment';
import { CreatePaymentRoute } from './ignite/payment/CreatePayment';
import { DeleteTokenRoute } from './ignite/payment/DeleteToken';
import { GetPaymentProductsRoute } from './ignite/payment/GetPaymentProducts';
import { GetPaymentStatusRoute } from './ignite/payment/GetPaymentStatus';
import { HostedCheckoutRoute } from './ignite/payment/HostedCheckout';
import { HostedTokenizationRoute } from './ignite/payment/HostedTokenization';
import { LoadPaymentMethodsRoute } from './ignite/payment/LoadPaymentMethods';
import { RefundPaymentRoute } from './ignite/payment/RefundPayment';
import { RetryPaymentRoute } from './ignite/payment/RetryPayment';
import { TestConnectionRoute } from './ignite/payment/TestConnection';
import { UpdatePaymentRoute } from './ignite/payment/UpdatePayment';
import { GetWebhookStatusRoute } from './ignite/webhook/GetWebhookStatus';
import { WebhookRoute } from './ignite/webhook/Webhook';

export abstract class Ignite {
  protected getValidateCartRoute() {
    return {
      'POST /cart/validate': new ValidateCartControllerRoute().route,
    };
  }

  protected getHealthCheckRoute() {
    return {
      'GET /health': new HealthControllerRoute().route,
    };
  }

  protected getUploadImageRoute() {
    return {
      'POST /upload/images': new UploadImageRoute().route,
    };
  }

  protected getCreateOrderRoute() {
    return {
      'POST /payment': new CreateOrderRoute().route,
    };
  }

  protected getOrderRoute() {
    return {
      'GET /order': new GetOrderRoute().route,
    };
  }

  protected getListOrdersRoute() {
    return {
      'GET /orders': new ListOrdersRoute().route,
    };
  }

  protected getCancelPaymentRoute() {
    return {
      'POST /payment/cancel': new CancelPaymentRoute().route,
    };
  }

  protected getCapturePaymentRoute() {
    return {
      'POST /payment/capture': new CapturePaymentRoute().route,
    };
  }

  protected getCreatePaymentRoute() {
    return {
      'POST /payment/charge': new CreatePaymentRoute().route,
    };
  }

  protected getDeleteTokenRoute() {
    return {
      'POST /token/remove': new DeleteTokenRoute().route,
    };
  }

  protected getPaymentProductsRoute() {
    return {
      'GET /payment/products': new GetPaymentProductsRoute().route,
    };
  }

  protected getPaymentStatusRoute() {
    return {
      'GET /payment': new GetPaymentStatusRoute().route,
    };
  }

  protected getHostedCheckoutRoute() {
    return {
      'POST /initiate/hostedcheckout': new HostedCheckoutRoute().route,
    };
  }

  protected getHostedTokenizationRoute() {
    return {
      'POST /initiate/hostedtokenization': new HostedTokenizationRoute().route,
    };
  }

  protected getLoadPaymentMethodsRoute() {
    return {
      'GET /payment/methods': new LoadPaymentMethodsRoute().route,
    };
  }

  protected getRefundPaymentRoute() {
    return {
      'POST /payment/refund': new RefundPaymentRoute().route,
    };
  }

  protected getRetryPaymentRoute() {
    return {
      'POST /payment/retry': new RetryPaymentRoute().route,
    };
  }

  protected getTestConnectionRoute() {
    return {
      'POST /testconnection': new TestConnectionRoute().route,
    };
  }

  protected getUpdatePaymentRoute() {
    return {
      'PUT /payment': new UpdatePaymentRoute().route,
    };
  }

  protected getWebhookRoute() {
    return {
      'POST /webhook': new WebhookRoute().route,
    };
  }

  protected getWebhookStatusRoute() {
    return {
      'GET /webhook/status': new GetWebhookStatusRoute().route,
    };
  }

  public get routes() {
    return {
      ...this.getValidateCartRoute(),
      ...this.getHealthCheckRoute(),
      ...this.getUploadImageRoute(),
      ...this.getCreateOrderRoute(),
      ...this.getOrderRoute(),
      ...this.getListOrdersRoute(),
      ...this.getCancelPaymentRoute(),
      ...this.getCapturePaymentRoute(),
      ...this.getCreatePaymentRoute(),
      ...this.getDeleteTokenRoute(),
      ...this.getPaymentProductsRoute(),
      ...this.getPaymentStatusRoute(),
      ...this.getHostedCheckoutRoute(),
      ...this.getHostedTokenizationRoute(),
      ...this.getLoadPaymentMethodsRoute(),
      ...this.getRefundPaymentRoute(),
      ...this.getRetryPaymentRoute(),
      ...this.getTestConnectionRoute(),
      ...this.getUpdatePaymentRoute(),
      ...this.getWebhookRoute(),
      ...this.getWebhookStatusRoute(),
    };
  }
}
