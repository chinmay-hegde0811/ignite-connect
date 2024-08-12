import { IgnitePayments } from './IgnitePayments';
import { IgniteTokens } from './IgniteTokens';
import { IgniteProducts } from './IgniteProducts';
import { IgniteServices } from './IgniteServices';
import { IgniteHostedCheckout } from './IgniteHostedCheckout';
import { IgniteHostedTokenization } from './IgniteHostedTokenization';

const connectService = async () => ({
  payments: new IgnitePayments(),
  tokens: new IgniteTokens(),
  products: new IgniteProducts(),
  services: new IgniteServices(),
  hostedCheckout: new IgniteHostedCheckout(),
  hostedTokenization: new IgniteHostedTokenization(),
});

export { connectService };
