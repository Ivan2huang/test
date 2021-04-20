import compose from './composer';
import options from './options';
import { Auth } from '../../modules/me';

export default compose(
  Auth,
  options,
);
