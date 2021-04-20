/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../helpers/reducer';
import { UPDATE_LIFESTYLE_DETAILS } from './action';

const initialState = {
  details: null,
};

const updateLifestyleDetails = produce((draft, action) => {
  const { lifestyleDetails } = action.payload;

  draft.details = lifestyleDetails;
});

const reducer = createReducer(initialState, {
  [UPDATE_LIFESTYLE_DETAILS]: updateLifestyleDetails,
});

export default reducer;
