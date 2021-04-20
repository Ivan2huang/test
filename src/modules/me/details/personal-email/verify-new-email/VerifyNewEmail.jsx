import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GridItem from '../../../../../uiComponents/GridItem';
import Loader from '../../../../loader/Loader';
import { navigateTo } from '../../../../../helpers/helpers';
import paths from '../../../../../helpers/paths';
import { verifyToken } from './api';
import { CHANGE_PERSONAL_EMAIL_TOKEN_EXPIRED } from '../../../constant';

const loaderStyle = theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.white,
  },
});
const EnhancedLoading = withStyles(loaderStyle)(Loader);

const VerifyNewEmail = ({ router }) => {
  const verifyTokenAndRedirect = async (clientId, token) => {
    let redirectUrl = paths.common.error;
    if (!clientId || !token) {
      return navigateTo(redirectUrl);
    }
    const response = await verifyToken(clientId, token);
    if (response && response.error) {
      const { messageKey } = response;
      if (messageKey === CHANGE_PERSONAL_EMAIL_TOKEN_EXPIRED) {
        redirectUrl = paths.common.verifyNewEmailLinkExpired;
      }
    } else {
      redirectUrl = paths.common.verifyNewEmailSuccess;
    }
    return navigateTo(redirectUrl);
  };

  useEffect(() => {
    const { clientId, token } = router.query;
    verifyTokenAndRedirect(clientId, token);
  }, []);

  return (
    <Grid container>
      <GridItem columns={{ xs: 12, md: 12 }}>
        <EnhancedLoading loading />
      </GridItem>
    </Grid>
  );
};

VerifyNewEmail.propTypes = {
  router: PropTypes.shape({}).isRequired,
};

export default withRouter(VerifyNewEmail);
