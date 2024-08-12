import { CancelPayment } from './ignite/CancelPayment';
import { CapturePayment } from './ignite/CapturePayment';
import { Common } from './ignite/Common';
import { Connection } from './ignite/Connection';
import { CreatePayment } from './ignite/CreatePayment';
import { DeleteToken } from './ignite/DeleteToken';
import { GetOrder } from './ignite/GetOrder';
import { GetPaymentProducts } from './ignite/GetPaymentProducts';
import { GetPaymentStatus } from './ignite/GetPaymentStatus';
import { GetWebhookStatus } from './ignite/GetWebhookStatus';
import { HostedCheckout } from './ignite/HostedCheckout';
import { HostedTokenization } from './ignite/HostedTokenization';
import { LoadPaymentMethods } from './ignite/LoadPaymentMethods';
import { RefundPayment } from './ignite/RefundPayment';
import { RetryPayment } from './ignite/RetryPayment';
import { ValidateCart } from './ignite/ValidateCart';
import { Webhook } from './ignite/Webhook';
import { CreateTransactionQuesParams } from './ignite/webhook/CreateTransactionQuesParams';
import { TransactionQueDBPayload } from './ignite/webhook/TransactionQueDBPayload';

export abstract class Ignite {
  public get getPaymentCancelServicePayload() {
    return CancelPayment.getPaymentCancelServicePayload;
  }

  public get getCaptureServicePayload() {
    return CapturePayment.getCaptureServicePayload;
  }

  public get calculateRemainingOrderAmount() {
    return CapturePayment.calculateRemainingOrderAmount;
  }

  public get appendAdditionalParamsToUrl() {
    return Common.appendAdditionalParamsToUrl;
  }

  public get camelCase() {
    return Common.camelCase;
  }

  public get getOrderResultMapper() {
    return Common.getOrderResultMapper;
  }

  public get getupdateOrderWithPaymentMapper() {
    return Common.getupdateOrderWithPaymentMapper;
  }

  public get isCartActive() {
    return Common.isCartActive;
  }

  public get findAmountByStatus() {
    return Common.findAmountByStatus;
  }

  public get getConnectionServiceProps() {
    return Connection.getConnectionServiceProps;
  }

  public get getServicePayload() {
    return CreatePayment.getServicePayload;
  }

  public get getHostedTokenizationPayload() {
    return CreatePayment.getHostedTokenizationPayload;
  }

  public get getDatabasePayload() {
    return CreatePayment.getDatabasePayload;
  }

  public get getCreatedPaymentMappedResponse() {
    return CreatePayment.getCreatedPaymentMappedResponse;
  }

  public get getDeletedTokenMappedResponse() {
    return DeleteToken.getDeletedTokenMappedResponse;
  }

  public get getOrderDBPayload() {
    return GetOrder.getOrderDBPayload;
  }

  public get getReplicateCartDBPayload() {
    return GetOrder.getReplicateCartDBPayload;
  }

  public get getOrderResponseMapper() {
    return GetOrder.getOrderResponseMapper;
  }

  public get getPaymentProductsMappedResponse() {
    return GetPaymentProducts.getPaymentProductsMappedResponse;
  }

  public get getPaymentStatusDBPayload() {
    return GetPaymentStatus.getPaymentStatusDBPayload;
  }

  public get getPaymentStatusResponseMapper() {
    return GetPaymentStatus.getPaymentStatusResponseMapper;
  }

  public get getWebhookStatusDBQuery() {
    return GetWebhookStatus.getWebhookStatusDBQuery;
  }

  public get getWebhookStatusResponseMapper() {
    return GetWebhookStatus.getWebhookStatusResponseMapper;
  }

  public get getHostedCheckoutPayload() {
    return HostedCheckout.getHostedCheckoutPayload;
  }

  public get getTokenizationServicePayload() {
    return HostedTokenization.getTokenizationServicePayload;
  }

  public get loadPaymentMethodsMappedResponse() {
    return LoadPaymentMethods.loadPaymentMethodsMappedResponse;
  }

  public get getRefundServicePayload() {
    return RefundPayment.getRefundServicePayload;
  }

  public get retryPaymentStatusPayload() {
    return RetryPayment.retryPaymentStatusPayload;
  }

  public get getCartSkus() {
    return ValidateCart.getCartSkus;
  }

  public get hasDefaultInventoryMode() {
    return ValidateCart.hasDefaultInventoryMode;
  }

  public get returnInventoryResponse() {
    return ValidateCart.returnInventoryResponse;
  }

  public get getCreateOrderCTPayload() {
    return Webhook.getCreateOrderCTPayload;
  }

  public get getCustomerTokenPayload() {
    return Webhook.getCustomerTokenPayload;
  }

  public get getMappedStatus() {
    return Webhook.getMappedStatus;
  }

  public get getPaymentDBPayload() {
    return Webhook.getPaymentDBPayload;
  }

  public get getPaymentFilterQuery() {
    return Webhook.getPaymentFilterQuery;
  }

  public get getUpdateCartPayload() {
    return Webhook.getUpdateCartPayload;
  }

  public get hasEqualAmountOrder() {
    return Webhook.hasEqualAmountOrder;
  }

  public get hasEqualAmounts() {
    return Webhook.hasEqualAmounts;
  }

  public get hasValidAmount() {
    return Webhook.hasValidAmount;
  }

  public get isPaymentProcessing() {
    return Webhook.isPaymentProcessing;
  }

  public get shouldSaveToken() {
    return Webhook.shouldSaveToken;
  }

  public get createTransactionQuesParams() {
    return new CreateTransactionQuesParams().execute;
  }

  public get transactionQueDBPayload() {
    return new TransactionQueDBPayload().execute;
  }
}
