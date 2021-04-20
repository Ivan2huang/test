import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { withStyles } from '@material-ui/core/styles';
import NotificationBox from '../../../uiComponents/NotificationBox';
import Typography from '../../../uiComponents/Typography';
import WarningLg from '../../../icons/WarningLg';

import { formatMessage } from '../../../helpers/helpers';

const styles = theme => ({
  warningIcon: {
    marginRight: theme.spacing(1),
  },
});

const PendingEmailStatus = ({ classes, intl }) => {
  return (
    <NotificationBox>
      <WarningLg className={classes.warningIcon} />
      <Typography type="style-6">
        {formatMessage(
          intl,
          'me.details.pendingEmailRequest.label',
          'Pending email address change request.',
        )}
      </Typography>
    </NotificationBox>
  );
};

PendingEmailStatus.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(injectIntl(PendingEmailStatus));
