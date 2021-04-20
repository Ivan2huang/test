import compose from '../composer';
import options from '../options';
import { HealthCards } from '../../../modules/doctors';

export default compose(
  HealthCards,
  options,
);
