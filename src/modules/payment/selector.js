import { createSelector } from 'reselect';
import { PAYMENT_METHODS } from '../../constants/types';

const paymentSelector = state => state;

export const paymentPurchaseMethodsSelector = state =>
  state.payment.purchasePaymentMethods;

export const orderSelector = createSelector(
  paymentSelector,
  paymentState => {
    const {
      merchantOrderId = '',
      purchaseId = '',
      amount: { value: amount = 0, currency = '' } = {},
      balance: { value: balance = 0, currency: balanceCurrency = '' } = {},
      maxWalletAmount: { value: maxWalletAmount = 0 } = {},
    } = paymentState;

    return {
      merchantOrderId,
      purchaseId,
      amount,
      currency,
      balance,
      balanceCurrency,
      maxWalletAmount,
    };
  },
);

export const mpgsSessionUrlSelector = createSelector(
  paymentSelector,
  paymentState => {
    const { payments = [] } = paymentState;
    const paymentMethod =
      payments.find(
        p =>
          p.paymentMethod === PAYMENT_METHODS.CREDIT_CARD ||
          p.paymentMethod.startsWith(PAYMENT_METHODS.MIX_CREDIT_CARD),
      ) || {};
    const paymentProcessors = paymentMethod.paymentProcessors || [];
    if (paymentProcessors.length > 0) {
      const creditCard = paymentProcessors.find(
        p => p.name === PAYMENT_METHODS.CREDIT_CARD,
      );
      if (creditCard) {
        return creditCard.sessionUrl;
      }
    }

    return '';
  },
);
