import compose from '../composer';
import options from '../options';
import { Wallets } from '../../../modules/benefits';

export default compose(
  Wallets,
  options,
);
