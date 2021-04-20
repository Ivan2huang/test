import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VerifyOTP from './VerifyOTP';
import { DETAILS_ID } from '../../../constant';
import {
  getMemberProfileWithMembershipNumber,
  verifyOTP,
  requestMobileNumberStatus,
  resendOTP,
} from '../../../action';
import Me from '../../../Me';

export const mapStateToProps = ({
  me: {
    member: { profile, mobileNumberStatus },
  },
}) => ({
  profile,
  mobileNumberStatus,
});

export const mapDispatchToProps = dispatch => ({
  verifyOTP: (token, errorMessage, reject) =>
    dispatch(verifyOTP(token, errorMessage, reject)),
  getMemberProfile: () => dispatch(getMemberProfileWithMembershipNumber()),
  getMobileNumberStatus: shouldNavigate =>
    dispatch(requestMobileNumberStatus(shouldNavigate)),
  resendOTP: mobileNumber => dispatch(resendOTP(mobileNumber)),
});

const EnhancedVerifyOTP = ({
  getMemberProfile,
  getMobileNumberStatus,
  profile,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMemberProfile();
    getMobileNumberStatus(true);
    setIsLoaded(true);
  }, []);

  return (
    <Me
      active={DETAILS_ID}
      isLoaded={isLoaded}
      memberProfile={profile}
      isMobileOnly
    >
      <VerifyOTP {...rest} />
    </Me>
  );
};

EnhancedVerifyOTP.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  getMobileNumberStatus: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedVerifyOTP);
