/* eslint-disable no-param-reassign */
import produce from 'immer';
import createReducer from '../../../helpers/reducer';
import { UPDATE_OTP_STATUS, STORE_USER_EMAIL } from './action';

export const initialState = {
  email: '',
  otpStatus: {},
};

const updateOtpStatus = produce((draft, action) => {
  const { status } = action.payload;
  draft.otpStatus = status;
});

const updateEmail = produce((draft, action) => {
  const { email } = action.payload;
  draft.email = email;
});

const reducer = createReducer(initialState, {
  [UPDATE_OTP_STATUS]: updateOtpStatus,
  [STORE_USER_EMAIL]: updateEmail,
});

export default reducer;
