import React, { useEffect, useState, useContext } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import ResetPasswordHeader from './ResetPasswordHeader';
import ResetPasswordForm from './ResetPasswordForm';
import VerifyAccountForm from './VerifyAccountForm';
import getLocale from '../../../i18n/getLocale';
import { IntlContext } from '../../../i18n/withIntlProvider';
import { isValidLanguageCode } from '../../../helpers/helpers';
import { getCookie } from '../../../helpers/auth';
import { LANG } from '../../../constants/auth';
import CONFIG from '../../../constants/config';

const ResetPassword = ({
  intl,
  resetPassword,
  router,
  validateResetPasswordRequest,
  isFirstTimeUser,
  dateOfBirthMatch,
  productName,
  setFormErrorIfDateOfBirthNoMatch,
  getProductName,
}) => {
  const {
    email,
    token,
    productName: productNameFromQuery,
    additionalVerification,
    lang,
    clientId,
  } = router.query;
  const [skipDOBValidation, setSkipDOBValidation] = useState(false);
  const setLocale = useContext(IntlContext);
  const selectedLang = lang || getCookie(LANG);
  const locale = isValidLanguageCode(selectedLang) ? selectedLang : getLocale();
  const selectedProductName = productName || productNameFromQuery;

  useEffect(() => {
    validateResetPasswordRequest(email, null, token, clientId);
    setLocale(locale);
  }, []);

  useEffect(() => {
    if (CONFIG.useProductNameFromCMS) {
      getProductName(intl.locale, productNameFromQuery || '');
    }
  }, [intl]);

  useEffect(() => {
    const skipDOBTimer = setTimeout(() => {
      const dateOfBirthValidationSuccess =
        dateOfBirthMatch && dateOfBirthMatch.errorState === false;
      setSkipDOBValidation(
        dateOfBirthValidationSuccess || additionalVerification === 'false',
      );
    });
    return () => {
      clearTimeout(skipDOBTimer);
    };
  }, [dateOfBirthMatch]);

  return skipDOBValidation ? (
    <>
      <ResetPasswordHeader
        userEmail={email}
        productName={selectedProductName}
        isFirstTimeUser={isFirstTimeUser}
      />
      <ResetPasswordForm
        resetPassword={resetPassword}
        email={email}
        token={token}
        isFirstTimeUser={isFirstTimeUser}
        productName={selectedProductName}
        clientId={clientId}
      />
    </>
  ) : (
    <VerifyAccountForm
      email={email}
      token={token}
      dateOfBirthMatch={dateOfBirthMatch}
      verifyDoB={validateResetPasswordRequest}
      setFormErrorIfDateOfBirthNoMatch={setFormErrorIfDateOfBirthNoMatch}
      clientId={clientId}
    />
  );
};
ResetPassword.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  validateResetPasswordRequest: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  isFirstTimeUser: PropTypes.bool.isRequired,
  dateOfBirthMatch: PropTypes.shape({}),
  setFormErrorIfDateOfBirthNoMatch: PropTypes.func.isRequired,
  getProductName: PropTypes.func.isRequired,
  productName: PropTypes.string,
};
ResetPassword.defaultProps = {
  dateOfBirthMatch: {},
  productName: '',
};
export default injectIntl(ResetPassword);
