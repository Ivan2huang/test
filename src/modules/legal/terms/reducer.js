/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_TERMS_CONDITIONS } from './action';

const initialState = { content: {} };

const updateTermsConditions = produce((draft, action) => {
  draft.content = action.payload.content;
});

const reducer = createReducer(initialState, {
  [UPDATE_TERMS_CONDITIONS]: updateTermsConditions,
});

export default reducer;
