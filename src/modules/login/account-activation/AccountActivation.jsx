import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { formatMessage, maskEmail } from '../../../helpers/helpers';
import { OtpVerification } from '../../common/otp-verification';
import { ACTIVATION_FORM, OTP_MAX_LENGTH } from './constant';
import { otp } from '../../../helpers/validation';

const VerifyOTP = ({ resend, verify, checkStatus, email, otpStatus }) => {
  const intl = useIntl();

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <OtpVerification
      headerTitle={formatMessage(
        intl,
        'login.accountActivation.header.title',
        'Active your account',
      )}
      headerDescription={formatMessage(
        intl,
        'login.accountActivation.header.description',
        'We’ve sent you a One Time Password on your email {email}.',
        { email: email ? maskEmail(email) : '' },
      )}
      otpStatus={otpStatus}
      resend={resend}
      verify={verify}
      validateOtp={otp}
      maxLength={OTP_MAX_LENGTH}
      form={ACTIVATION_FORM}
    />
  );
};

VerifyOTP.propTypes = {
  email: PropTypes.string.isRequired,
  otpStatus: PropTypes.shape({}).isRequired,
  checkStatus: PropTypes.func.isRequired,
  verify: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
};

export default VerifyOTP;
