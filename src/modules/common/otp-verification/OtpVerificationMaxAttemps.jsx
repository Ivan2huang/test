import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, withStyles } from '@material-ui/core';

import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import Images from '../../../constants/images';
import { formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  bgImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      minHeight: '400px',
      [theme.breakpoints.down('sm')]: {
        minHeight: 'auto',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(7),
    },
  },
  headContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  contentContainer: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
});

const MaxAttempsError = ({
  intl,
  headerTitle,
  headerDescription,
  classes,
  background,
}) => {
  return (
    <Box mt={{ md: 10 }} mb={8}>
      <Grid>
        <GridItem columns={{ xs: 12, md: 5 }}>
          <Box className={classes.bgImageContainer}>
            <img src={background} alt="" />
          </Box>
        </GridItem>
        <GridItem offset={{ md: 1 }} columns={{ xs: 12, md: 6 }}>
          <Box mb={6} className={classes.headContainer}>
            <Typography type="style-1">
              {headerTitle ||
                formatMessage(
                  intl,
                  'otpVerification.label.header',
                  'Unable to send OTP',
                )}
            </Typography>
          </Box>
          <Box className={classes.contentContainer}>
            <Typography type="style-6">
              {headerDescription ||
                formatMessage(
                  intl,
                  'otpVerification.label.description',
                  'Maximum OTP verification reached. For security purposes, you can request new OTP only after 24 hours from your earlier OTP request.',
                )}
            </Typography>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

MaxAttempsError.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  background: PropTypes.string,
  headerTitle: PropTypes.string,
  headerDescription: PropTypes.string,
};

MaxAttempsError.defaultProps = {
  headerTitle: '',
  headerDescription: '',
  background: Images.VERIFY_OPT_MAX_ATTEMPTS_BACKGROUND,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(MaxAttempsError);
