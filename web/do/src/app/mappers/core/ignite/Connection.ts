import { Ignite } from '../../../datatypes';

export class Connection {
  public static getConnectionServiceProps(props: Ignite.ConnectionProps) {
    return (({
      apiKey,
      apiSecret,
      publicKey,
      merchantReference,
      authorizationMode,
      webhookSecret,
    }) => ({
      apiKey,
      apiSecret,
      publicKey,
      merchantReference,
      authorizationMode,
      webhookSecret,
    }))(props);
  }
}
