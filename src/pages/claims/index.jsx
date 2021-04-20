import { compose } from 'redux';

import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';
import { ClaimsContainer } from '../../modules/claims';
import Images from '../../constants/images';

export default compose(
  withAuth,
  withLayout,
)(ClaimsContainer, { backgroundImage: Images.CLAIMS_BACKGROUND });
