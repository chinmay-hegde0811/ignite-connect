import { PSP } from '@ignite/ctintegration-do';

export class IgniteHostedTokenization {
  createHostedTokenization() {
    return {
      body: {
        id: '',
        status: '',
        errors: [{ httpStatusCode: 200 }],
      } as unknown as PSP.Types.Ignite.HostedTokenizationServiceResponse,
    };
  }

  getHostedTokenization() {
    return {
      body: {
        id: '',
        status: '',
        errors: [{ httpStatusCode: 200 }],
      } as unknown as PSP.Types.Ignite.HostedTokenizationServiceResponse,
    };
  }
}
