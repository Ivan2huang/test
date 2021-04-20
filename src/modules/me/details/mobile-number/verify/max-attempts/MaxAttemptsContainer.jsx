import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MaxAttemptsOTP from './MaxAttemptsOTP';
import { DETAILS_ID } from '../../../../constant';
import Me from '../../../../Me';
import { getMemberProfileWithMembershipNumber } from '../../../../action';

export const mapStateToProps = ({
  me: {
    member: { profile },
  },
}) => ({
  profile,
});

export const mapDispatchToProps = dispatch => ({
  getMemberProfile: () => dispatch(getMemberProfileWithMembershipNumber()),
});

const EnhancedMaxOTPAttempts = ({ getMemberProfile, profile, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getMemberProfile();
    setIsLoaded(true);
  }, []);

  return (
    <Me
      active={DETAILS_ID}
      isLoaded={isLoaded}
      memberProfile={profile}
      isMobileOnly
    >
      <MaxAttemptsOTP {...rest} />
    </Me>
  );
};

EnhancedMaxOTPAttempts.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedMaxOTPAttempts);
