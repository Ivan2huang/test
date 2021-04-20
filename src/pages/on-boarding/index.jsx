import React, { cloneElement } from 'react';
import CONFIG from '../../constants/config';
import { ResetPasswordContainer } from '../../modules/login/reset-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';
import { isValidLanguageCode } from '../../helpers/helpers';

const illustrations = {
  cendol: Images.RESET_PASSWORD,
};

const showHeaderBrand = {
  basil: true,
};

const ResetPasswordContainerForFirstTimeUser = () =>
  cloneElement(<ResetPasswordContainer />, { isFirstTimeUser: true });

const OnboardingPage = withLoginLayout(ResetPasswordContainerForFirstTimeUser, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
  illustration: illustrations[CONFIG.themeCode],
  illustrationDesktopOnly: true,
  showHeaderBrand: showHeaderBrand[CONFIG.themeCode],
});

OnboardingPage.getInitialProps = async ({ res, query: { lang } }) => {
  const selectedLanguage = isValidLanguageCode(lang)
    ? lang
    : CONFIG.defaultLanguage;
  if (res) {
    res.cookie('lang', selectedLanguage);
  }

  return {
    lang: selectedLanguage,
  };
};

export default OnboardingPage;
