import { PSP } from '@ignite/ctintegration-do';

export class IgniteHostedCheckout {
  createHostedCheckout() {
    return {
      body: {
        id: '',
        status: '',
        errors: [{ httpStatusCode: 200 }],
      } as unknown as PSP.Types.Ignite.HostedCheckoutServiceResponse,
    };
  }
}
