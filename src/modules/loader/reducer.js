/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../helpers/reducer';
import { START_LOADER, STOP_LOADER } from './action';

const initialState = {};

const startLoader = produce((draft, action) => {
  const { id, message } = action.payload;
  let counter = 1;
  if (draft[id]) {
    counter = draft[id].counter + 1;
  } else {
    draft[id] = {};
  }
  draft[id].counter = counter;
  draft[id].message = message;
  draft[id].loaded = false;
});

const stopLoader = produce((draft, action) => {
  const { id } = action.payload;
  const { counter } = draft[id];
  draft[id].counter = counter - 1;
  if (draft[id].counter <= 0) {
    draft[id].loaded = true;
  }
});

const reducer = createReducer(initialState, {
  [START_LOADER]: startLoader,
  [STOP_LOADER]: stopLoader,
});

export default reducer;
