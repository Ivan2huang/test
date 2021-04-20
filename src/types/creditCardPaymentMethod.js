import { shape, oneOf, arrayOf } from 'prop-types';
import cardType from './cardType';
import amountType from './amountType';
import { PAYMENT_METHODS } from '../constants/types';

export default shape({
  paymentMethod: oneOf([PAYMENT_METHODS.CREDIT_CARD]),
  originalAmount: amountType,
  amount: amountType,
  cards: arrayOf(cardType).isRequired,
});
