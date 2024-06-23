import { PSP } from '@ignite/ctintegration-psp';

export class TestConnection {
  public async execute() {
    // Verify the connection
    return PSP.Core.testConnection();
  }
}
