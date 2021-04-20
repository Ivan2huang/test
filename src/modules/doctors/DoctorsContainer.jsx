import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Doctors from './Doctors';

const DoctorsContainer = ({ memberProfile, ...rest }) => {
  return <Doctors memberProfile={memberProfile} {...rest} />;
};

DoctorsContainer.propTypes = {
  memberProfile: PropTypes.shape().isRequired,
};

export const mapStateToProps = ({ me, benefits }) => ({
  memberProfile: me.member.profile,
  hasEHealthCard: benefits.benefitStatus.hasEHealthCard,
});

export default connect(mapStateToProps)(DoctorsContainer);
