export class IgniteTokens {
  removeToken() {
    return {
      isSuccess: true,
      body: { id: '', status: '', errors: [{ httpStatusCode: 200 }] },
    };
  }
}
