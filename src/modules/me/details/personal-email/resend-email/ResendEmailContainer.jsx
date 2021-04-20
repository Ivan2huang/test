import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ResendEmail from './ResendEmail';
import { DETAILS_ID, NONE, PROCESSING } from '../../../constant';
import {
  getMemberProfileWithMembershipNumber,
  changePersonalEmail,
  requestPersonalEmailStatus,
} from '../../../action';
import Me from '../../../Me';

export const mapStateToProps = ({
  me: {
    member: { profile, personalEmailStatus },
  },
}) => ({
  profile,
  personalEmailStatus,
});

export const mapDispatchToProps = dispatch => ({
  changePersonalEmail: (oldEmail, newEmail, errorMessage, reject) =>
    dispatch(changePersonalEmail(oldEmail, newEmail, errorMessage, reject)),
  getMemberProfile: () => dispatch(getMemberProfileWithMembershipNumber()),
  getStatusPersonalEmail: (shouldNavigate, statusForCheck) =>
    dispatch(requestPersonalEmailStatus(shouldNavigate, statusForCheck)),
});

const EnhancedResendEmail = ({
  getMemberProfile,
  getStatusPersonalEmail,
  profile,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMemberProfile();
    getStatusPersonalEmail(true, PROCESSING);
    setIsLoaded(true);
  }, []);

  return (
    <Me
      active={DETAILS_ID}
      isLoaded={isLoaded}
      memberProfile={profile}
      isMobileOnly
    >
      <ResendEmail {...rest} profile={profile} />
    </Me>
  );
};

EnhancedResendEmail.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
  getStatusPersonalEmail: PropTypes.func.isRequired,
  personalEmailStatus: PropTypes.shape({
    email: PropTypes.string,
    status: PropTypes.oneOf([NONE, PROCESSING]).isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedResendEmail);
