import { AuthClient } from '../clients/authClient';

export class GetAccessToken {
  public async execute() {
    const authClient = new AuthClient();
    return authClient.getClientCredentialsToken();
  }
}
