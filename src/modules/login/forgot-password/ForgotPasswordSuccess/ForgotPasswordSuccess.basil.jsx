/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';

import ForgotPasswordSuccessContent from '../ForgotPasswordSuccessContent';

const ForgotPasswordSuccess = props => {
  return (
    <>
      <ForgotPasswordSuccessContent showBackBtn={false} {...props} />
    </>
  );
};

export default ForgotPasswordSuccess;
