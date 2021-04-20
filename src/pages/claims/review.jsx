import { compose } from 'redux';

import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';
import { ReviewClaimContainer } from '../../modules/claims/make-claim';

export default compose(
  withAuth,
  withLayout,
)(ReviewClaimContainer);
