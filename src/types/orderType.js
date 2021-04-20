import { shape, number, string, arrayOf } from 'prop-types';

export default shape({
  merchantOrderId: string.isRequired,
  amount: number.isRequired,
  currency: string.isRequired,
  balance: number.isRequired,
  balanceCurrency: string.isRequired,
  maxWalletAmount: number.isRequired,
  redirectUrl: string,
  instrumentId: number,
  sessionId: string,
  orderItems: arrayOf(
    shape({
      name: string,
      description: string,
      sku: string,
      qty: number,
      unitPrice: number,
      unit: string,
    }),
  ),
});
