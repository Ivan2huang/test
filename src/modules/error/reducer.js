/* eslint-disable no-param-reassign */

import produce from 'immer';
import createReducer from '../../helpers/reducer';
import { UPDATE_ERROR } from './action';

const initialState = {};

const updateError = produce((draft, action) => {
  const { id, errorState } = action.payload;
  draft[id] = { errorState };
});

const reducer = createReducer(initialState, {
  [UPDATE_ERROR]: updateError,
});

export default reducer;
