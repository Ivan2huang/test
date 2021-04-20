import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Details from './Details';
import PersonInfo from './PersonInfo';
import PersonInfoDependent from './PersonInfoDependent';
import Me from '../MeContainer';
import { DETAILS_ID } from '../constant';
import {
  getMemberProfileWithMembershipNumber,
  requestPersonalEmailStatus,
  requestMobileNumberStatus,
} from '../action';

const mapStateToProps = ({ me }) => ({
  memberProfile: me.member.profile,
  personalEmailStatus: me.member.personalEmailStatus,
  mobileNumberStatus: me.member.mobileNumberStatus,
});

const mapDispatchToProps = {
  getMemberProfile: getMemberProfileWithMembershipNumber,
  getPersonalEmailStatus: requestPersonalEmailStatus,
  getMobileNumberStatus: requestMobileNumberStatus,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { memberProfile } = stateProps;
  const { role } = memberProfile;
  const componentMap = {
    employee: PersonInfo,
    dependent: PersonInfoDependent,
  };

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    components: {
      PersonInfo: componentMap[role.toLowerCase()],
    },
  };
};

const DetailsContainer = ({
  getMemberProfile,
  getPersonalEmailStatus,
  getMobileNumberStatus,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMemberProfile();
    getPersonalEmailStatus();
    getMobileNumberStatus();
    setIsLoaded(true);
  }, []);

  return (
    <Me active={DETAILS_ID} isLoaded={isLoaded}>
      <Details {...rest} />
    </Me>
  );
};

DetailsContainer.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  getPersonalEmailStatus: PropTypes.func.isRequired,
  getMobileNumberStatus: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DetailsContainer);
