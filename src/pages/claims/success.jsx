import { compose } from 'redux';

import withAuth from '../../authentication/withAuthProvider';
import withLayout from '../../layouts/withLayoutProvider';
import { MakeClaimSuccess } from '../../modules/claims/make-claim';

export default compose(
  withAuth,
  withLayout,
)(MakeClaimSuccess);
