import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Me from './Me';
import {
  resetPassword as resetPasswordAction,
  updateResetPasswordResult as updateResetPasswordResultAction,
} from './settings/action';

const mapStateToProps = ({ me }) => {
  const {
    settings: { isRequestResetPasswordSuccess },
    member: {
      profile: { email, workEmail },
    },
  } = me;

  return { isRequestResetPasswordSuccess, email: email || workEmail };
};

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
  updateResetPasswordResult: updateResetPasswordResultAction,
};

const MeContainer = props => {
  return <Me {...props} />;
};

MeContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  updateResetPasswordResult: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeContainer);
