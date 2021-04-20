import { shape, string, number, oneOfType } from 'prop-types';

const cardType = shape({
  maskedCreditCardNumber: string.isRequired,
});

export default shape({
  id: oneOfType([string, number]).isRequired,
  card: cardType.isRequired,
});
