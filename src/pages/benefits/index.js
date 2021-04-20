import compose from './composer';
import options from './options';
import { Auth } from '../../modules/benefits';

export default compose(
  Auth,
  options,
);
