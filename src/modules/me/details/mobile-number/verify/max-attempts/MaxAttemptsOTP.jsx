import React from 'react';
import MaxAttempsError from '../../../../../common/otp-verification/OtpVerificationMaxAttemps';
import Layout from '../../../personal-email/Layout';

const MaxAttemptsOTP = () => {
  return (
    <Layout noBackground>
      <MaxAttempsError />
    </Layout>
  );
};

export default MaxAttemptsOTP;
