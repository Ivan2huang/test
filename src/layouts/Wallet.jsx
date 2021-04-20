import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core';
import Typography from '../uiComponents/Typography';
import { formatMessage, formatAmount } from '../helpers/helpers';
import { WalletIcon } from '../icons/me';
import CONFIG from '../constants/config';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    zIndex: 1000,
    marginTop: theme.spacingX(20),
    width: '100%',
    height: '54px',
    backgroundColor: theme.white,
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacingX(14),
      boxShadow: `0px 1px 0px #E8E8E8`,
      justifyContent: 'space-between',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacingX(11),
    marginLeft: theme.spacingX(8),

    '& > svg': {
      height: '21px',
      width: '21px',
      marginRight: theme.spacingX(2),
    },
  },
  text: {
    fontSize: '16px',
  },
  amount: {
    marginRight: theme.spacingX(10),
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacingX(8),
    },
  },
}));

const Wallet = ({ balance, isWalletsDisabled }) => {
  const classes = useStyles();
  const intl = useIntl();
  const amount = formatAmount(intl, balance);
  const currency = CONFIG.useCurrencySymbol ? '$' : 'HK $';
  return (
    !isWalletsDisabled && (
      <div className={classes.root}>
        <div className={classes.label}>
          <WalletIcon />
          <Typography className={classes.text} color="mediumEmphasis">
            {formatMessage(intl, 'nav.wallet.label', 'Wallet')}
          </Typography>
        </div>
        <Typography
          color="mediumEmphasis"
          className={classes.amount}
          fontWeight="semiBold"
        >
          {formatMessage(intl, 'nav.wallet.balance', `${currency}${amount}`, {
            amount,
            currency,
          })}
        </Typography>
      </div>
    )
  );
};

Wallet.propTypes = {
  balance: PropTypes.number.isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ benefits: { wallets } }) => {
  const { isWalletsDisabled } = wallets;
  const balance = get(wallets, 'wallets.member.balance', 0);
  return {
    isWalletsDisabled,
    balance,
  };
};
export default connect(mapStateToProps)(Wallet);
