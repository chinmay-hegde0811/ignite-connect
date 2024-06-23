import { Payments } from './ignite/Payment';
import { Common } from './ignite/Common';

export abstract class Ignite {
  public get createPaymentResponseMapper() {
    return Payments.createPaymentResponseMapper;
  }

  public get getIncrementedReferenceMapper() {
    return Payments.getIncrementedReferenceMapper;
  }

  public get retry() {
    return Common.retry;
  }
}
