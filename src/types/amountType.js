import { shape, string, number, oneOfType } from 'prop-types';

export default shape({
  value: oneOfType([number, string]).isRequired,
  currency: string.isRequired,
});
