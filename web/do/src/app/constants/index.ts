const PSP_CREDITCARD = 'PSP_CREDITCARD';
const HOSTED_AND_APMS = 'HOSTED_AND_APMS';
const REDIRECT_PSP = 'REDIRECT_PSP';

export default {
  CART: {
    ACTIVE: 'Active',
  },
  TRANSACTION: {
    CHARGE: 'Charge',
    REFUND: 'Refund',
    CANCEL_AUTHORIZATION: 'CancelAuthorization',
    PAID: 'Paid',
  },
  ORDER: {
    CONFIRMED: 'Confirmed',
    COMPLETE: 'Complete',
    CANCELLED: 'Cancelled',
  },
  PAYMENT: {
    REDIRECTMODE_A: {
      TYPE: 'offsite',
    },
    REDIRECTMODE_B: {
      TYPE: 'offsite',
      PAYMENT_METHOD: 'pspOffsite',
    },
    ONSITEMODE: {
      TYPE: 'onsite',
      PAYMENT_METHOD: 'pspOnsite',
    },
    DATABASE: {
      STATUS: {
        FAILED: 'FAILED',
      },
      STATE: {
        DEFAULT: 'DEFAULT',
        PROCESSING: 'PROCESSING',
      },
      PAYMENT_OPTIONS: {
        PSP_CREDITCARD,
        HOSTED_AND_APMS,
        REDIRECT_PSP,
      },
    },
  },
  STATUS: {
    AUTHORIZED: 'AUTHORIZED',
    CAPTURED: 'CAPTURED',
    VOID: 'VOID',
    PARTIAL_CAPTURED: 'PARTIAL_CAPTURED',
    REFUNDED: 'REFUNDED',
    PARTIAL_REFUNDED: 'PARTIAL_REFUNDED',
    FAIL: 'FAIL',
  },
  getPSPCreditCardOption() {
    return PSP_CREDITCARD;
  },
  getHostedAndAPMOption() {
    return HOSTED_AND_APMS;
  },
  getRedirectPSPOption() {
    return REDIRECT_PSP;
  },
  getPaymentOptions() {
    return [PSP_CREDITCARD, HOSTED_AND_APMS, REDIRECT_PSP];
  },
};
