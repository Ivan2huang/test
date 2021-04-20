import compose from './composer';
import options from './options';
import { Auth } from '../../modules/doctors';

export default compose(
  Auth,
  options,
);
