import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateEmail from './UpdateEmail';
import { DETAILS_ID, NONE } from '../../../constant';

import {
  getMemberProfileWithMembershipNumber,
  changePersonalEmail,
  requestPersonalEmailStatus,
} from '../../../action';
import Me from '../../../Me';

export const mapStateToProps = ({
  me: {
    member: { profile },
  },
}) => ({
  profile,
});

export const mapDispatchToProps = dispatch => ({
  changePersonalEmail: (oldEmail, newEmail, errorMessage, reject) =>
    dispatch(changePersonalEmail(oldEmail, newEmail, errorMessage, reject)),
  getMemberProfile: () => dispatch(getMemberProfileWithMembershipNumber()),
  getStatusPersonalEmail: (shouldNavigate, statusForCheck) =>
    dispatch(requestPersonalEmailStatus(shouldNavigate, statusForCheck)),
});

const EnhancedUpdateEmail = ({
  getMemberProfile,
  getStatusPersonalEmail,
  profile,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMemberProfile();
    getStatusPersonalEmail(true, NONE);
    setIsLoaded(true);
  }, []);

  return (
    <Me
      active={DETAILS_ID}
      isLoaded={isLoaded}
      memberProfile={profile}
      isMobileOnly
    >
      <UpdateEmail {...rest} profile={profile} />
    </Me>
  );
};

EnhancedUpdateEmail.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  getStatusPersonalEmail: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedUpdateEmail);
