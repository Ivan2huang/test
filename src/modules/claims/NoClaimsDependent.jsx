import React from 'react';
import { injectIntl } from 'react-intl';

import { Box, Hidden, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import Typography from '../../uiComponents/Typography';
import { formatMessage } from '../../helpers/helpers';

const styles = theme => ({
  noClaimsWrapper: {
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },
  hintEmployee: {
    width: '100%',
    margin: '0px',
    [theme.breakpoints.up('md')]: {
      width: 311,
      margin: 'auto',
    },
  },
  hintForm: {
    color: theme.hyperlink,
  },
});

const NoClaimsDependent = ({ intl, classes }) => {
  return (
    <Box mt={{ md: 34 }} className={classes.noClaimsWrapper}>
      <Box mt={{ sm: 16 }} />
      <Box implementation="css" mb={8} mt={8} mdUp component={Hidden}>
        <Typography type="style-2">
          {formatMessage(intl, 'claims.heading')}
        </Typography>
      </Box>
      <Box mt={{ sm: 8 }} className={classes.hintEmployee}>
        <Typography type="style-6">
          {formatMessage(intl, 'claims.noClaim.dependent.hintEmployee')}
        </Typography>
      </Box>
    </Box>
  );
};

NoClaimsDependent.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    noClaimsWrapper: PropTypes.string.isRequired,
    hintEmployee: PropTypes.string.isRequired,
    hintForm: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(withStyles(styles)(NoClaimsDependent));
