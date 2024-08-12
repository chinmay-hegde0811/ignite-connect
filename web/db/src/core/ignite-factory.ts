import { Payment } from './ignite/Payment';
import { PaymentToken } from './ignite/PaymentToken';
import { GetCronJobs } from './ignite/cron/GetCronJobs';
import { GetTransactionQue } from './ignite/webhook/GetTransactionQue';
import { UpdateTransactionQue } from './ignite/webhook/UpdateTransactionQue';
import { CreateTransactionQue } from './ignite/webhook/CreateTransactionQue';

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

  public get getCronJobs() {
    return new GetCronJobs().execute;
  }

  public get getTransactionQues() {
    return new GetTransactionQue().execute;
  }

  public get updateTransactionQues() {
    return new UpdateTransactionQue().execute;
  }

  public get createTransactionQues() {
    return new CreateTransactionQue().execute;
  }
}
