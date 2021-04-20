/* eslint-disable no-param-reassign */

import produce from 'immer';
import createReducer from '../../../helpers/reducer';
import { UPDATE_CLAIM_DETAILS, CLEAR_CLAIM_DETAILS } from './action';

const initialState = {};

const updateNewClaimDetails = produce((draft, action) => {
  Object.assign(draft, action.payload.claimDetails);
});

const clearClaimDetails = produce(draft => {
  Object.keys(draft).forEach(key => {
    delete draft[key];
  });
});

const reducer = createReducer(initialState, {
  [UPDATE_CLAIM_DETAILS]: updateNewClaimDetails,
  [CLEAR_CLAIM_DETAILS]: clearClaimDetails,
});

export default reducer;
