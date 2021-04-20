import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, Card, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { formatMessage, formatAmount } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import { EXPIRY_DATE_FORMAT } from './constant';
import CONFIG from '../../../constants/config';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacingX(6),
    flexDirection: 'column',
    alignItems: 'flex-start',

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacingX(8),
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  walletCardHolder: {
    marginTop: theme.spacingX(4),
    padding: theme.spacingX(6),
    display: 'flex',
    alignItems: 'flex-start',
    background: theme.white,
    flexDirection: 'column',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    '&:last-child': {
      paddingBottom: theme.spacingX(8),
    },

    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacingX(2),
      padding: theme.spacingX(8),
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  name: {
    marginBottom: theme.spacingX(4),
    [theme.breakpoints.up('sm')]: {
      flex: 2,
    },
  },

  balanceWrapper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flex: 3,
    },
  },

  amount: {
    marginLeft: theme.spacingX(2),
    whiteSpace: 'nowrap',
  },

  progressRoot: {
    marginTop: theme.spacingX(3),
    backgroundColor: theme.disabled,
    borderRadius: '2.5px',
  },

  progressbar: {
    backgroundColor: theme.primary,
    borderRadius: '2.5px',
  },
}));

const Wallets = ({ intl, wallets: { expiryDate, wallets = [] } }) => {
  const formattedExpiryDate = moment(expiryDate).format(EXPIRY_DATE_FORMAT);
  const classes = useStyles();
  const currencyTranslate = formatMessage(intl, `common.currency.HK`, '(HK$)');
  const currency = CONFIG.useCurrencySymbol ? '($)' : currencyTranslate;
  const walletHeader = formatMessage(
    intl,
    'me.tabs.wallets.header',
    `Wallet balance`,
  );

  return (
    wallets.length > 0 && (
      <Box>
        <Box
          className={classes.header}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={8}
        >
          <Typography type="style-1">{`${walletHeader}${currency}`}</Typography>
          <Typography type="style-6">
            {formatMessage(
              intl,
              'me.tabs.wallets.expiryDate',
              `Expires on ${formattedExpiryDate}`,
              { expiryDate: formattedExpiryDate },
            )}
          </Typography>
        </Box>
        {wallets.map(
          ({
            memberId,
            lastName = '',
            firstName = '',
            balance = 0,
            openBalance = 0,
          }) => (
            <Card key={memberId} classes={{ root: classes.walletCardHolder }}>
              <Box className={classes.name}>
                <Typography type="style-3">
                  {[lastName, firstName].join(' ')}
                </Typography>
              </Box>
              <Box className={classes.balanceWrapper}>
                <Box display="flex">
                  <Typography type="style-2">
                    {formatAmount(intl, balance)}
                  </Typography>
                  <Typography
                    type="style-2"
                    color="lowEmphasis"
                    className={classes.amount}
                  >
                    {formatMessage(
                      intl,
                      'me.tabs.wallets.amount',
                      ` of ${formatAmount(intl, openBalance)}`,
                      { amount: formatAmount(intl, openBalance) },
                    )}
                  </Typography>
                </Box>
                <LinearProgress
                  value={(balance / openBalance) * 100}
                  variant="determinate"
                  classes={{
                    root: classes.progressRoot,
                    bar: classes.progressbar,
                  }}
                />
              </Box>
            </Card>
          ),
        )}
      </Box>
    )
  );
};

Wallets.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  wallets: PropTypes.shape({}).isRequired,
};

export default injectIntl(Wallets);
