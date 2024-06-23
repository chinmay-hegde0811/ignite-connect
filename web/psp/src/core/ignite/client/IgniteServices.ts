export class IgniteServices {
  testConnection() {
    return {
      isSuccess: true,
      body: { id: '', status: '', errors: [{ httpStatusCode: 200 }] },
    };
  }
}
