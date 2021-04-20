import actionCreator from '../../../helpers/action';

export const UPDATE_LANGUAGE_PREFERENCE = 'UPDATE_LANGUAGE_PREFERENCE';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const SETTING_RESET_PASSWORD = 'SETTING_RESET_PASSWORD';
export const UPDATE_RESET_PASSWORD_RESULT = 'UPDATE_RESET_PASSWORD_RESULT';

export const updateLanguagePreference = actionCreator(
  UPDATE_LANGUAGE_PREFERENCE,
  'language',
  'setLocaleCallback',
  'clientId',
);

export const updateSettings = actionCreator(UPDATE_SETTINGS, 'settings');
export const resetPassword = actionCreator(SETTING_RESET_PASSWORD);
export const updateResetPasswordResult = actionCreator(
  UPDATE_RESET_PASSWORD_RESULT,
  'result',
);
