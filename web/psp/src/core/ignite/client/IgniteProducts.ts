export class IgniteProducts {
  getPaymentProducts() {
    return {
      body: {
        id: '',
        status: '',
        errors: [{ httpStatusCode: 200 }],
        paymentProducts: [
          {
            id: 123,
            displayHints: {
              displayOrder: 1,
              label: 'label',
              logo: 'logo',
            },
          },
        ],
      },
    };
  }
}
