import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { formatMessage } from '../../../../helpers/helpers';
import Typography from '../../../../uiComponents/Typography';
import Modal from '../../../../uiComponents/Modal';

const ResultModal = ({ intl, email, handleClose, open }) => {
  const renderTitle = () => (
    <Typography type="style-2">
      {formatMessage(
        intl,
        'me.tab.setting.modal.resetPassword.title',
        'Check your email',
      )}
    </Typography>
  );

  return (
    <Modal title={renderTitle()} open={open} handleClose={handleClose}>
      <Typography type="style-6">
        {formatMessage(
          intl,
          'me.tab.setting.modal.resetPassword.message',
          `We've sent the reset password link to {email}. If you don't see the email, please check your junk or spam folders.`,
          { email },
        )}
      </Typography>
    </Modal>
  );
};

ResultModal.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  email: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default injectIntl(ResultModal);
