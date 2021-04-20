import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';
import TrackingButton from '../../uiComponents/TrackingButton';

import { formatMessage, navigateTo } from '../../helpers/helpers';
import Typography from '../../uiComponents/Typography';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import paths from '../../helpers/paths';
import { CATEGORIES } from '../../constants/analytics';

const styles = theme => ({
  hintMakeClaims: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
});

const ClaimsHeader = ({ intl, classes }) => {
  const navigateToMakeClaim = () => {
    navigateTo(paths.employee.makeClaim);
  };

  return (
    <Box>
      <Box>
        <Typography type="style-1">
          {formatMessage(intl, 'claims.heading', 'Claims')}
        </Typography>
      </Box>
      <Box mt={{ xs: 2 }}>
        <Grid>
          <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
            <Box mt={{ sm: 8 }} className={classes.hintMakeClaims}>
              <Typography type="style-6">
                {formatMessage(
                  intl,
                  'claims.description',
                  'Make sure your receipts and supporting documents are ready before making a claim.',
                )}
              </Typography>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box mt={{ xs: 6 }}>
        <TrackingButton
          data-testid="btn-make-claim"
          variant="contained"
          color="primary"
          onClick={navigateToMakeClaim}
          trackingData={{
            category: CATEGORIES.CLAIMS_PAGE,
            action: 'Make a claim',
          }}
        >
          {formatMessage(intl, 'claims.button.label', 'Make a claim')}
        </TrackingButton>
      </Box>
    </Box>
  );
};

ClaimsHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    hintMakeClaims: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(withStyles(styles)(ClaimsHeader));
