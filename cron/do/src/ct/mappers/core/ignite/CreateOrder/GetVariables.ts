import Constants from '../../../../constants';
import { Ignite } from '../../../../datatypes';

const { ORDER, CUSTOM_OBJECT } = Constants;

export class GetVariables {
  public async execute(payload?: Ignite.CreateOrderPayload) {
    if (!payload) {
      throw {
        message: 'Payload is missing!',
        statusCode: 400,
      };
    }

    const { id, version, authorizationMode } = payload;

    if (!id || !version || !authorizationMode) {
      throw {
        message: 'Payload data is incomplete!',
        statusCode: 400,
      };
    }

    const paymentState =
      authorizationMode === CUSTOM_OBJECT.AUTHORIZATION_MODE.SALE
        ? ORDER.PAYMENT_STATE.PAID
        : ORDER.PAYMENT_STATE.PENDING;

    return {
      id, // cart id
      version,
      paymentState,
    };
  }
}
