import actionCreator from '../../../helpers/action';

export const GET_PRIVACY_POLICY = 'GET_PRIVACY_POLICY';
export const UPDATE_PRIVACY_POLICY = 'UPDATE_PRIVACY_POLICY';

export const getPrivacyPolicy = actionCreator(GET_PRIVACY_POLICY, 'locales');
export const updatePrivacyPolicy = actionCreator(
  UPDATE_PRIVACY_POLICY,
  'content',
);
