import React, { useEffect } from 'react';
import { navigateTo } from '../../../helpers/helpers';
import { DETAILS_PATHNAME } from '../constant';

const Auth = () => {
  useEffect(() => {
    navigateTo(DETAILS_PATHNAME);
  }, []);
  return <></>;
};

export default Auth;
