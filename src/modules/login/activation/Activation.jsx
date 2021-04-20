import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { Box, useTheme } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

import { ERROR_CODE, VERIFICATION_SUCCESS, INITIAL } from './constant';
import ActivationResultMessage from './ActivationResultMessage';
import { formatMessage } from '../../../helpers/helpers';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Loading from '../../../uiComponents/Loading';
import Images from '../../../constants/images';
import Error from '../../error/Error';

const useStyles = makeStyles({
  container: ({ theme }) => ({
    background: `url(
      ${Images.ACTIVATION_BACKGROUND}) no-repeat`,
    height: '100vh',

    [theme.breakpoints.down('sm')]: {
      backgroundSize: '80%',
      backgroundPosition: 'top center',
      marginTop: theme.spacingX(10),
    },
    [theme.breakpoints.up('md')]: {
      backgroundSize: 'auto 80%',
      backgroundPosition: 'bottom left',
    },
  }),
  main: ({ theme }) => ({
    flex: 1,
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    padding: theme.spacingX(8, 8, 0, 8),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacingX(32, 16, 0, 16),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacingX(70),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacingX(40, 31, 0, 31),
      marginTop: theme.spacingX(40),
    },
  }),
  textContainer: ({ theme }) => ({
    flex: 1,
    backgroundColor: theme.background,
  }),
});

export const Activation = ({ intl, verificationStatus, activate, router }) => {
  const { client, token } = router.query;
  const classes = useStyles({ theme: useTheme() });

  useEffect(() => {
    activate(client, token);
  }, []);

  if (verificationStatus === INITIAL) {
    return <Loading />;
  }

  if (verificationStatus !== VERIFICATION_SUCCESS) {
    if (ERROR_CODE[verificationStatus]) {
      return (
        <Error
          errorTitle={formatMessage(
            intl,
            ERROR_CODE[verificationStatus].messageKey,
            ERROR_CODE[verificationStatus].defaultMessage,
          )}
          errorDesc={formatMessage(
            intl,
            'activationExpired.Header.description',
            'Click on "Re-send" in the App to request a new link.',
          )}
          hideBackBtn
          hideHomeBtn
        />
      );
    }

    return <Error hideBackBtn hideHomeBtn />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      classes={{ root: classes.container }}
    >
      <main className={classes.main}>
        <Grid>
          <GridItem
            offset={{ sm: 2, md: 6 }}
            columns={{ xs: 12, sm: 8, md: 4 }}
          >
            <ActivationResultMessage
              title={formatMessage(
                intl,
                'activationSuccess.Header.title',
                'Your email has been verified successfully.',
              )}
              message={formatMessage(
                intl,
                'activationSuccess.Header.description',
                'Please go back to the app and click on "I’ve verified" to start using the app.',
              )}
            />
          </GridItem>
        </Grid>
      </main>
    </Box>
  );
};

Activation.propTypes = {
  activate: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  verificationStatus: PropTypes.string.isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(Activation);
