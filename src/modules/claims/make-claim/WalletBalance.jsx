import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, withStyles, IconButton } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import CircularProgress from '../../../icons/CircularProgress';
import Refresh from '../../../icons/Refresh';
import { formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  root: {
    backgroundColor: theme.background,
    borderRadius: theme.borderRadiusX(1),
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
});

const WalletBalance = ({
  walletBalance,
  loading,
  error,
  onRefresh,
  intl,
  classes,
}) => {
  const isWalletBalanceZero = walletBalance <= 0;
  const isNotProvidedWallet = !loading && walletBalance === undefined;
  const isError = isWalletBalanceZero || error || isNotProvidedWallet;

  const renderWalletBalanceAmount = () => {
    if (loading) {
      return <CircularProgress />;
    }
    if (isNotProvidedWallet) {
      return null;
    }
    if (error) {
      return (
        <IconButton
          color="primary"
          component="span"
          onClick={onRefresh}
          classes={{ root: classes.iconButton }}
          data-testid="btn-refresh"
        >
          <Refresh />
        </IconButton>
      );
    }
    return (
      <Box whiteSpace="nowrap" alignSelf="flex-start">
        <Typography type="style-7" color={isError ? 'error' : 'mediumEmphasis'}>
          {`HK$ ${walletBalance}`}
        </Typography>
      </Box>
    );
  };

  const renderError = () => {
    let errorMessage;
    if (error || isNotProvidedWallet) {
      errorMessage = formatMessage(
        intl,
        'claim.makeClaimForm.walletBalance.apiError',
        'Unable to display wellness balance. Try again later.',
      );
    }
    if (isWalletBalanceZero) {
      errorMessage = formatMessage(
        intl,
        'claim.makeClaimForm.walletBalance.zeroBalanceError',
        'Your wellness balance account is empty. You will not be able to make a wellness claim.',
      );
    }
    return (
      <Typography type="style-8" color="error">
        {errorMessage}
      </Typography>
    );
  };

  return (
    <Box
      className={classes.root}
      p={4}
      mt={3}
      mb={5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        {!isNotProvidedWallet && (
          <Typography
            type="style-6"
            color={isError ? 'error' : 'mediumEmphasis'}
          >
            {formatMessage(
              intl,
              'claim.makeClaimForm.walletBalance.header',
              'Wellness balance',
            )}
          </Typography>
        )}
        {isError && renderError()}
      </Box>
      {renderWalletBalanceAmount()}
    </Box>
  );
};

WalletBalance.propTypes = {
  walletBalance: PropTypes.number,
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
    iconButton: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  intl: PropTypes.shape({}).isRequired,
};

WalletBalance.defaultProps = {
  walletBalance: undefined,
};

export default withStyles(Styles)(injectIntl(WalletBalance));
