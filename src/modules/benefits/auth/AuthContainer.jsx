import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Auth from './Auth';

const mapStateToProps = ({ me, benefits }) => ({
  memberProfile: me.member.profile,
  hasEHealthCard: benefits.benefitStatus.hasEHealthCard,
});

const AuthContainer = ({ memberProfile, hasEHealthCard }) => {
  return <Auth memberProfile={memberProfile} hasEHealthCard={hasEHealthCard} />;
};

AuthContainer.propTypes = {
  memberProfile: PropTypes.shape({}).isRequired,
  hasEHealthCard: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthContainer);
