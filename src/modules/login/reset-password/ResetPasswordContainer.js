import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { stopSubmit } from 'redux-form';

import {
  resetPassword,
  validateResetPasswordRequest,
  getProductName,
} from './action';
import ResetPassword from './ResetPassword';
import ERROR from '../../../constants/error';

let currentDoB;

export const mapStateToProps = (state, props) => {
  return {
    isFirstTimeUser: !!props.isFirstTimeUser,
    dateOfBirthMatch: state.error[ERROR.resetPassword.dateOfBirthMatch],
    productName: state.resetPassword.productName,
  };
};

export const mapDispatchToProps = dispatch => ({
  resetPassword: (
    email,
    password,
    token,
    isFirstTimeUser,
    productName,
    clientId,
  ) =>
    dispatch(
      resetPassword(
        email,
        password,
        currentDoB,
        token,
        isFirstTimeUser,
        productName,
        clientId,
      ),
    ),
  validateResetPasswordRequest: (
    email,
    dateOfBirth,
    token,
    clientId,
    isVerifyingDoB,
  ) => {
    currentDoB = dateOfBirth;
    return dispatch(
      validateResetPasswordRequest(
        email,
        dateOfBirth,
        token,
        clientId,
        isVerifyingDoB,
      ),
    );
  },
  setFormErrorIfDateOfBirthNoMatch: ({ formName, fieldName }) =>
    dispatch(stopSubmit(formName, { [fieldName]: 'error' })),
  getProductName: (locale, fallbackName) =>
    dispatch(getProductName(locale, fallbackName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ResetPassword));
