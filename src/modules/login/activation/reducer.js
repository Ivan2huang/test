/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_VALIDATION_STATUS } from './action';
import { INITIAL } from './constant';

export const initialState = {
  verificationStatus: INITIAL,
};

const updateValidationStatus = produce((draft, action) => {
  const { status } = action.payload;

  draft.verificationStatus = status;
});

const reducer = createReducer(initialState, {
  [UPDATE_VALIDATION_STATUS]: updateValidationStatus,
});

export default reducer;
