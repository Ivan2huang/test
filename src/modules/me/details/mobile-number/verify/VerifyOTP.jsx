import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import Layout from '../../personal-email/Layout';
import { OtpVerification } from '../../../../common/otp-verification';
import { formatMessage } from '../../../../../helpers/helpers';

const VerifyOTP = ({ verifyOTP, resendOTP, mobileNumberStatus }) => {
  const intl = useIntl();
  return (
    <Layout>
      <OtpVerification
        headerTitle={formatMessage(
          intl,
          'me.details.verifyOTP.label.header',
          'Verify your mobile number',
        )}
        headerDescription={formatMessage(
          intl,
          'me.details.verifyOTP.label.description',
          'We’ve sent you a One Time Password on your new mobile number.',
        )}
        otpStatus={mobileNumberStatus}
        resend={resendOTP}
        verify={verifyOTP}
        form="verify-otp-form"
      />
    </Layout>
  );
};

VerifyOTP.propTypes = {
  mobileNumberStatus: PropTypes.shape({}).isRequired,
  verifyOTP: PropTypes.func.isRequired,
  resendOTP: PropTypes.func.isRequired,
};

export default VerifyOTP;
