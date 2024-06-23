import { Payment } from './ignite/Payment';
import { PaymentToken } from './ignite/PaymentToken';

export abstract class Ignite {
  public get saveCustomerPaymentToken() {
    return new PaymentToken().saveCustomerPaymentToken;
  }

  public get getCustomerPaymentToken() {
    return new PaymentToken().getCustomerPaymentToken;
  }

  public get deleteCustomerPaymentTokens() {
    return new PaymentToken().deleteCustomerPaymentTokens;
  }

  public get getPaymentTokensByCustomerID() {
    return new PaymentToken().getPaymentTokensByCustomerID;
  }

  public get getDBOrders() {
    return new Payment().getDBOrders;
  }

  public get createPaymentInDB() {
    return new Payment().createPaymentInDB;
  }

  public get getIncrementedReference() {
    return new Payment().getIncrementedReference;
  }

  public get getPayment() {
    return new Payment().getPayment;
  }

  public get setPayment() {
    return new Payment().setPayment;
  }
}
