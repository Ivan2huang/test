import { compose } from 'redux';

import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';
import { ClaimDetailsContainer } from '../../modules/claims/claim-details';

export default compose(
  withAuth,
  withLayout,
)(ClaimDetailsContainer);
