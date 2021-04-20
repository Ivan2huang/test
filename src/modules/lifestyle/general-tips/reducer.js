/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_LIFESTYLE_TIPS } from './action';

const initialState = {
  details: {},
};

const updateLifestyleTips = produce((draft, action) => {
  const { tips } = action.payload;
  draft.details = tips;
});

const reducer = createReducer(initialState, {
  [UPDATE_LIFESTYLE_TIPS]: updateLifestyleTips,
});

export default reducer;
