/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_LIFESTYLE_RESULTS } from './action';

const initialState = {
  details: {},
};

const updateLifestyleResults = produce((draft, action) => {
  const { results } = action.payload;
  draft.details = results;
});

const reducer = createReducer(initialState, {
  [UPDATE_LIFESTYLE_RESULTS]: updateLifestyleResults,
});

export default reducer;
