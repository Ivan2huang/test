import { shape, oneOf, bool } from 'prop-types';
import amountType from './amountType';
import { PAYMENT_METHODS } from '../constants/types';

export default shape({
  paymentMethod: oneOf([PAYMENT_METHODS.WALLET]),
  amount: amountType,
  isSufficient: bool,
});
