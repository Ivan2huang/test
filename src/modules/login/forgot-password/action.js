import actionCreator from '../../../helpers/action';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';

export const forgotPassword = actionCreator(FORGOT_PASSWORD, 'email', 'verify');
