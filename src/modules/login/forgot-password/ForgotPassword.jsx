import React, { useEffect, useContext } from 'react';
import * as PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import ForgotPasswordHeader from './ForgotPasswordHeader';
import ForgotPasswordForm from './ForgotPasswordForm';
import { isValidLanguageCode } from '../../../helpers/helpers';
import { IntlContext } from '../../../i18n/withIntlProvider';
import getLocale from '../../../i18n/getLocale';

const ForgotPassword = ({ forgotPassword }) => {
  const { query } = useRouter();
  const setLocale = useContext(IntlContext);
  const locale = isValidLanguageCode(query.lang) ? query.lang : getLocale();

  useEffect(() => {
    setLocale(locale);
  }, []);

  return (
    <>
      <ForgotPasswordHeader />
      <ForgotPasswordForm forgotPassword={forgotPassword} />
    </>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default ForgotPassword;
