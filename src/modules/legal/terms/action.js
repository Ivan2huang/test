import actionCreator from '../../../helpers/action';

export const GET_TERMS_CONDITIONS = 'GET_TERMS_CONDITIONS';
export const UPDATE_TERMS_CONDITIONS = 'UPDATE_TERMS_CONDITIONS';
export const ACCEPT_TERMS = 'ACCEPT_TERMS';

export const getTermsConditions = actionCreator(
  GET_TERMS_CONDITIONS,
  'alreadyAcceptedTerms',
  'locales',
);
export const updateTermsConditions = actionCreator(
  UPDATE_TERMS_CONDITIONS,
  'content',
);
export const acceptTerms = actionCreator(ACCEPT_TERMS, 'alreadyAcceptedEdm');
