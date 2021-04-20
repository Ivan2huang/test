import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { claimReducer } from '../modules/claims';
import { makeClaimReducer } from '../modules/claims/make-claim';
import { claimDetailsReducer } from '../modules/claims/claim-details';
import { loaderReducer } from '../modules/loader';
import { profileReducer } from '../modules/me';
import { settingsReducer } from '../modules/me/settings';
import { lifestyleReducer } from '../modules/lifestyle';
import { lifestyleTipsReducer } from '../modules/lifestyle/general-tips';
import { lifestyleResultsReducer } from '../modules/lifestyle/lifestyle-results';
import { errorReducer } from '../modules/error';
import { lifestyleHealthScoresHistoryReducer } from '../modules/lifestyle/lifestyle-history';
import { lifestyleScoreReducer } from '../modules/lifestyle/lifestyle-score';
import { faceAgingReducer } from '../modules/lifestyle/face-aging';
import { questionnaireReducer } from '../modules/lifestyle/questionnaire';
import { privacyReducer } from '../modules/legal/privacy';
import { termsReducer } from '../modules/legal/terms';
import { paymentReducer } from '../modules/payment';
import { activationReducer } from '../modules/login/activation';
import { newsLetterReducer } from '../modules/legal/newsletter';
import { miscReducer } from '../modules/misc';
import { recommendationsReducer } from '../modules/common/recommendations';
import { walletReducer } from '../modules/benefits/wallets';
import { usefulDocumentsReducer } from '../modules/benefits/documents';
import { helpReducer } from '../modules/benefits/help';
import { clinicReducer } from '../modules/doctors/clinic';
import { accountActivationReducer } from '../modules/login/account-activation';
import { benefitsStatusReducer } from '../modules/benefits';
import { resetPasswordReducer } from '../modules/login/reset-password';

const claim = combineReducers({
  history: claimReducer,
  makeClaim: makeClaimReducer,
  claimDetails: claimDetailsReducer,
});

const me = combineReducers({
  member: profileReducer,
  settings: settingsReducer,
});

const lifestyle = combineReducers({
  overview: lifestyleReducer,
  tips: lifestyleTipsReducer,
  results: lifestyleResultsReducer,
  history: lifestyleHealthScoresHistoryReducer,
  healthScore: lifestyleScoreReducer,
  faceAging: faceAgingReducer,
  questionnaire: questionnaireReducer,
});

const legalContentsReducer = combineReducers({
  privacyPolicy: privacyReducer,
  termsConditions: termsReducer,
  newsLetter: newsLetterReducer,
});

const common = combineReducers({
  recommendations: recommendationsReducer,
});

const benefits = combineReducers({
  wallets: walletReducer,
  documents: usefulDocumentsReducer,
  help: helpReducer,
  benefitStatus: benefitsStatusReducer,
});

const reducer = combineReducers({
  common,
  claim,
  me,
  lifestyle,
  legalContents: legalContentsReducer,
  form: formReducer,
  clinic: clinicReducer,
  loader: loaderReducer,
  error: errorReducer,
  payment: paymentReducer,
  activation: activationReducer,
  miscData: miscReducer,
  benefits,
  accountActivation: accountActivationReducer,
  resetPassword: resetPasswordReducer,
});

export default reducer;
