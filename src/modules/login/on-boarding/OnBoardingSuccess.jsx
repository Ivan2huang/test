import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'next/router';

import { Box, Button, withStyles } from '@material-ui/core';
import QRCodeImage from 'qrcode.react';

import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import paths from '../../../helpers/paths';
import images from '../../../constants/images';
import CONFIG from '../../../constants/config';

const Styles = theme => ({
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
  buttonImage: {
    maxWidth: 148,
  },
  appLinks: {
    padding: 0,
    flex: 1,
    background: 'none',
    '&:hover': {
      background: 'none',
    },
  },
  noTextDecoration: {
    display: 'block',
    textDecoration: 'none',
  },
});

const OnBoardingSuccess = ({
  intl,
  classes,
  router,
  productName,
  getProductName,
}) => {
  console.log('OnBoardingSuccess.jsx render');
  const { productName: productNameFromQuery } = router.query;
  const selectedProductName = productName || productNameFromQuery;

  useEffect(() => {
    if (CONFIG.useProductNameFromCMS) {
      getProductName(intl.locale, productNameFromQuery);
    }
  }, [intl]);

  return (
    <>
      <Box>
        <Typography type="style-1">
          {formatMessage(
            intl,
            'login.resetPassword.onBoarding.success.header',
            'You are all set!',
          )}
        </Typography>
      </Box>
      <Box mt={4} my={8}>
        <Typography type="style-6">
          {formatMessage(
            intl,
            'login.resetPassword.onBoarding.success.description',
            `Access your employee benefits and wellness programmes with ${selectedProductName} app or website.`,
            { selectedProductName },
          )}
        </Typography>
      </Box>

      <Box className={classes.linksContainer}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={5}>
            <Typography type="style-6">
              {formatMessage(
                intl,
                'login.resetPassword.onBoarding.success.download',
                'Download',
              )}
            </Typography>
          </Box>
          <Button
            disableRipple
            disableFocusRipple
            type="button"
            target="_blank"
            data-testid="btn-app-store"
            href={CONFIG.appStoreLink}
            classes={{ root: classes.appLinks }}
          >
            <img
              className={classes.buttonImage}
              src={images.APP_STORE_BADGE}
              alt=""
            />
          </Button>
          <Button
            disableRipple
            disableFocusRipple
            type="button"
            target="_blank"
            data-testid="btn-play-store"
            href={CONFIG.playStoreLink}
            classes={{ root: classes.appLinks }}
          >
            <img
              className={classes.buttonImage}
              src={images.PLAY_STORE_BADGE}
              alt=""
            />
          </Button>
        </Box>
        <Box ml={4} display="flex" flexDirection="column" alignItems="center">
          <Box mb={5}>
            <Typography type="style-6">
              {formatMessage(
                intl,
                'login.resetPassword.onBoarding.success.qrCode',
                'Scan QR code',
              )}
            </Typography>
          </Box>
          <QRCodeImage
            size={120}
            value={`${CONFIG.webLink}${paths.common.appLink}`}
          />
        </Box>
      </Box>
    </>
  );
};

OnBoardingSuccess.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    appLinks: PropTypes.string.isRequired,
    noTextDecoration: PropTypes.string.isRequired,
    linksContainer: PropTypes.string.isRequired,
    buttonImage: PropTypes.string.isRequired,
  }).isRequired,
  productName: PropTypes.string.isRequired,
  getProductName: PropTypes.func.isRequired,
};

export default compose(injectIntl)(
  withRouter(withStyles(Styles)(OnBoardingSuccess)),
);
