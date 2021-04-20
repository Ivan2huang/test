import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { formatMessage } from '../../../helpers/helpers';
import MaxAttempsError from '../../common/otp-verification/OtpVerificationMaxAttemps';

const UnableSendOTP = ({ intl }) => {
  return (
    <MaxAttempsError
      headerDescription={formatMessage(
        intl,
        'login.accountActivation.unable.header.description',
        'Maximum OTP verification reached. For security purposes, you can not activate your account for 24 hours. You can request new OTP only after 24 hours from your earlier OTP request.',
      )}
    />
  );
};

UnableSendOTP.propTypes = {
  intl: PropTypes.shape({}).isRequired,
};

export default injectIntl(UnableSendOTP);
