import { ErrorObject } from '@commercetools/platform-sdk';

interface ConnectionProps {
  apiKey: string;
  apiSecret: string;
  publicKey: string;
  merchantReference: string;
  authorizationMode: string;
  webhookSecret: string;
}

export interface PaymentConfiguration {
  paymentConfiguration: {
    projectSettings: {
      enabled: boolean;
      tokenize: boolean;
      account: {
        environment: string;
        live: ConnectionProps;
        test: ConnectionProps;
      };
    };
    paymentMethods: {
      onsite: {
        enabled: boolean;
        title: string;
        buttonTitle: string;
        action: string;
        imageUrl: string[];
      };
      offsite: {
        enabled: boolean;
        title: string;
        buttonTitle: string;
        action: string;
        imageUrl: string[];
      };
      googlePay: {
        enabled: boolean;
        title: string;
        buttonTitle: string;
        action: string;
        imageUrl: string[];
      };
      applePay: {
        enabled: boolean;
        title: string;
        buttonTitle: string;
        action: string;
        imageUrl: string[];
      };
    };
  };
}

type CustomObjectsValue = PaymentConfiguration;
export interface CustomObjectsResponse {
  body: {
    data: {
      customObject: {
        id: string;
        container: string;
        key: string;
        value: CustomObjectsValue;
      };
    };
    errors: ErrorObject[];
  };
}

export type CustomObjects = ConnectionProps & PaymentConfiguration;
