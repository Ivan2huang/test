import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NotificationBox from '../../../uiComponents/NotificationBox';
import Typography from '../../../uiComponents/Typography';
import WarningLg from '../../../icons/WarningLg';

import { formatMessage } from '../../../helpers/helpers';
import {
  VERIFY_OTP_PATHNAME,
  VERIFY_OTP_MAX_ATTEMPTS_PATHNAME,
} from '../constant';

const styles = theme => ({
  warningIcon: {
    marginRight: theme.spacing(1),
  },
  verifyLink: {
    textDecoration: 'underline',
    paddingLeft: theme.spacing(1),
  },
});

const PendingMobileNumberStatus = ({ classes, intl, allowedToVerify }) => {
  return (
    <NotificationBox>
      <WarningLg className={classes.warningIcon} />
      <Typography type="style-6">
        {formatMessage(
          intl,
          'me.details.pendingMobileNumberRequest.label.pending',
          'Pending mobile number change request.',
        )}
      </Typography>
      <Link
        color="textPrimary"
        href={
          allowedToVerify
            ? VERIFY_OTP_PATHNAME
            : VERIFY_OTP_MAX_ATTEMPTS_PATHNAME
        }
        className={classes.verifyLink}
      >
        <Typography type="style-6">
          {formatMessage(
            intl,
            'me.details.pendingMobileNumberRequest.link.verifyNow',
            'Verify now',
          )}
        </Typography>
      </Link>
    </NotificationBox>
  );
};

PendingMobileNumberStatus.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  allowedToVerify: PropTypes.bool.isRequired,
};

export default withStyles(styles)(injectIntl(PendingMobileNumberStatus));
