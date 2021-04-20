import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateMobileNumber from './UpdateMobileNumber';
import { DETAILS_ID } from '../../../constant';

import {
  getMemberProfileWithMembershipNumber,
  changeMobileNumber,
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
  changeMobileNumber: (mobileNumber, errorMessage, reject) =>
    dispatch(changeMobileNumber(mobileNumber, errorMessage, reject)),
  getMemberProfile: () => dispatch(getMemberProfileWithMembershipNumber()),
});

const EnhancedUpdateMobileNumber = ({ getMemberProfile, profile, ...rest }) => {
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
      <UpdateMobileNumber {...rest} profile={profile} />
    </Me>
  );
};

EnhancedUpdateMobileNumber.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedUpdateMobileNumber);
