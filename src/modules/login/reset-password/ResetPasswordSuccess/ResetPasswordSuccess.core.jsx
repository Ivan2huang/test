import React from 'react';

import ResetPasswordSuccessContent from '../ResetPasswordSuccessContent';

const ResetPasswordSuccess = props => {
  return (
    <>
      <ResetPasswordSuccessContent showBackBtn={false} {...props} />
    </>
  );
};

export default ResetPasswordSuccess;
