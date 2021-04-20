import { compose } from 'redux';

import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';
import { Clinic } from '../../modules/doctors/clinic';

export default compose(
  withAuth,
  withLayout,
)(Clinic);
