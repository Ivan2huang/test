/* eslint-disable no-param-reassign */
import produce from 'immer';
import createReducer from '../../../helpers/reducer';
import { UPDATE_RESET_PASSWORD_RESULT } from './action';

const initialState = {
  isRequestResetPasswordSuccess: false,
};

const updateResetPasswordResult = produce((state, action) => {
  return {
    ...state,
    isRequestResetPasswordSuccess: action.payload.result,
  };
});

const reducer = createReducer(initialState, {
  [UPDATE_RESET_PASSWORD_RESULT]: updateResetPasswordResult,
});

export default reducer;
