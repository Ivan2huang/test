/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_PRIVACY_POLICY } from './action';

const initialState = {
  content: {},
};

const updatePrivacyPolicy = produce((draft, action) => {
  draft.content = action.payload.content;
});

const reducer = createReducer(initialState, {
  [UPDATE_PRIVACY_POLICY]: updatePrivacyPolicy,
});

export default reducer;
