import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';

import { formatMessage } from '../../helpers/helpers';
import Typography from '../../uiComponents/Typography';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';

const styles = theme => ({
  hintEmployee: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  hintForm: {
    color: theme.hyperlink,
  },
});

const ClaimsHeader = ({ intl, classes }) => {
  return (
    <Box>
      <Box>
        <Typography type="style-2">
          {formatMessage(intl, 'claims.heading', 'Claims')}
        </Typography>
      </Box>
      <Box mt={{ xs: 8, md: 0 }}>
        <Grid>
          <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
            <Box mt={{ sm: 8 }} className={classes.hintEmployee}>
              <Typography type="style-6">
                {formatMessage(intl, 'claims.noClaim.dependent.hintEmployee')}
              </Typography>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

ClaimsHeader.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    hintEmployee: PropTypes.string.isRequired,
    hintForm: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(withStyles(styles)(ClaimsHeader));
