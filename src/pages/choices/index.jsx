import React from 'react';
import { compose } from 'redux';

import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';

const Choices = () => <div>Choices</div>;

export default compose(
  withAuth,
  withLayout,
)(Choices);
