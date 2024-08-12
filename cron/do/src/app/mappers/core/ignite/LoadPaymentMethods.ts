import { Ignite } from '../../../datatypes';

export class LoadPaymentMethods {
  public static async loadPaymentMethodsMappedResponse(
    customConfig: Ignite.CustomObjects,
    customerPaymentTokens: Ignite.CustomerPaymentToken[] | null,
  ) {
    const { paymentMethods } = customConfig.paymentConfiguration;
    const { tokenize } = customConfig.paymentConfiguration.projectSettings;

    const tokens =
      customerPaymentTokens && Array.isArray(customerPaymentTokens)
        ? customerPaymentTokens.map((cpt) => ({
            title: cpt?.title || '',
            token: cpt?.token || '',
            type: 'onsite',
          }))
        : [];

    const paymentMethod: Ignite.PaymentMethod[] = [];

    Object.entries(paymentMethods).forEach(([key, value]) => {
      if (value && value.enabled) {
        paymentMethod.push({
          title: value.title || '',
          buttonTitle: value.buttonTitle || '',
          action: value.action || '',
          enabled: value.enabled,
          type: key === 'onsite' || key === 'offsite' ? key : 'apm',
          imageUrl: Array.isArray(value.imageUrl)
            ? value.imageUrl
            : [value.imageUrl],
        });
      }
    });
    return {
      paymentMethods: [...tokens, ...paymentMethod],
      tokenize,
    };
  }
}
