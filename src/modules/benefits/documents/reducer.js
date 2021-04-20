/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_USEFUL_DOCUMENTS } from './action';

const initialState = {
  usefulDocuments: [],
};

const updateUsefulDocuments = produce((draft, action) => {
  const { usefulDocuments } = action.payload;
  draft.usefulDocuments = usefulDocuments;
});

const reducer = createReducer(initialState, {
  [UPDATE_USEFUL_DOCUMENTS]: updateUsefulDocuments,
});

export default reducer;
