import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';

import { Button } from '@material-ui/core';

import withAuth from '../../authentication/withAuthProvider';
import { LifestyleContainer } from '../../modules/lifestyle';
import withLayout from '../../layouts/withLayoutProvider';
import { navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import config from '../../constants/config';

const FindClinicButton = () => (
  <Button
    color="primary"
    variant="contained"
    onClick={() => navigateTo(paths.common.clinic)}
  >
    <FormattedMessage
      id="lifestyle.button.findClinic"
      defaultMessage="Find a clinic"
    />
  </Button>
);

export default config.featureToggleLifestyle
  ? withAuth(LifestyleContainer)
  : compose(
      withAuth,
      withLayout,
      injectIntl,
    )(FindClinicButton);
