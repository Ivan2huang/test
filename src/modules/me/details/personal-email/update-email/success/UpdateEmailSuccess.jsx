import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, withStyles } from '@material-ui/core';
import { withRouter } from 'next/router';

import Grid from '../../../../../../uiComponents/Grid';
import GridItem from '../../../../../../uiComponents/GridItem';
import Typography from '../../../../../../uiComponents/Typography';
import Images from '../../../../../../constants/images';
import { formatMessage } from '../../../../../../helpers/helpers';

import Layout from '../../Layout';

const Styles = theme => ({
  bgImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(7),
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

const UpdateEmailSuccess = ({ classes, intl, router }) => {
  const [sentEmail, setSentEmail] = useState('');

  useEffect(() => {
    const { email } = router.query;
    setSentEmail(email);
  }, []);

  return (
    <Layout>
      <Box mt={{ md: 20 }} mb={12}>
        <Grid>
          <GridItem offset={{ md: 1 }} columns={{ xs: 12, md: 5 }}>
            <Box className={classes.bgImageContainer}>
              <img src={Images.UPDATE_PERSONAL_EMAIL} alt="" />
            </Box>
          </GridItem>
          <GridItem columns={{ xs: 12, md: 5 }}>
            <Box mb={10} className={classes.headContainer}>
              <Typography type="style-1">
                {formatMessage(
                  intl,
                  'me.details.updateEmailSuccess.label.header',
                  'Check your email',
                )}
              </Typography>
            </Box>
            <Box className={classes.contentContainer}>
              <Typography type="style-6">
                {formatMessage(
                  intl,
                  'me.details.updateEmailSuccess.label.content',
                  'We’ve sent the confirmation email to {email}. Your email will be updated once you’ve confirmed your email. If you don’t see the email, check your junk or spam folders',
                  {
                    email: sentEmail,
                  },
                )}
              </Typography>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};

UpdateEmailSuccess.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
};

export default compose(
  withRouter,
  injectIntl,
  withStyles(Styles),
)(UpdateEmailSuccess);
