import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateEmailSuccess from './UpdateEmailSuccess';
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

const EnhancedUpdateEmailSuccess = ({ getMemberProfile, profile, ...rest }) => {
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
      <UpdateEmailSuccess {...rest} />
    </Me>
  );
};

EnhancedUpdateEmailSuccess.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedUpdateEmailSuccess);
