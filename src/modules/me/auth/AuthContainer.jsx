import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Auth from './Auth';

const mapStateToProps = ({ me }) => ({
  memberProfile: me.member.profile,
});

const AuthContainer = ({ memberProfile }) => {
  return <Auth memberProfile={memberProfile} />;
};

AuthContainer.propTypes = {
  memberProfile: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(AuthContainer);
