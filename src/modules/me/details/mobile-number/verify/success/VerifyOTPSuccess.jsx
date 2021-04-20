import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, withStyles } from '@material-ui/core';

import Grid from '../../../../../../uiComponents/Grid';
import GridItem from '../../../../../../uiComponents/GridItem';
import Typography from '../../../../../../uiComponents/Typography';
import Images from '../../../../../../constants/images';
import { formatMessage } from '../../../../../../helpers/helpers';

import Layout from '../../../personal-email/Layout';

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

const VerifyOTPSuccess = ({ classes, intl }) => {
  return (
    <Layout noBackground>
      <Box mt={{ md: 20 }} mb={12}>
        <Grid>
          <GridItem columns={{ xs: 12, md: 5 }}>
            <Box className={classes.bgImageContainer}>
              <img src={Images.VERIFY_OPT_SUCCESS_BACKGROUND} alt="" />
            </Box>
          </GridItem>
          <GridItem offset={{ md: 1 }} columns={{ xs: 12, md: 6 }}>
            <Box mb={6} className={classes.headContainer}>
              <Typography type="style-1">
                {formatMessage(
                  intl,
                  'me.details.verifyOTPSuccess.label.header',
                  'Successfully Changes',
                )}
              </Typography>
            </Box>
            <Box className={classes.contentContainer}>
              <Typography type="style-6">
                {formatMessage(
                  intl,
                  'me.details.verifyOTPSuccess.label.description',
                  'We have successfully changed your mobile number.',
                )}
              </Typography>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};

VerifyOTPSuccess.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(VerifyOTPSuccess);
