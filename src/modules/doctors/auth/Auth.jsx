import React, { useEffect } from 'react';
import { navigateTo } from '../../../helpers/helpers';
import { FIND_DOCTOR_PATHNAME } from '../constant';

const Auth = () => {
  useEffect(() => {
    navigateTo(FIND_DOCTOR_PATHNAME);
  }, []);
  return <></>;
};
export default Auth;
