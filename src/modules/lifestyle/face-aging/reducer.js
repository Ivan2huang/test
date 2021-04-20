/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_USER_FACE_AGING_CATEGORIES } from './action';

const initialState = {
  faceAgingIsDone: false,
  categories: [],
};

const updateFaceAgingCategories = produce((draft, action) => {
  draft.faceAgingIsDone = action.payload.faceAgingIsDone;
  draft.categories = action.payload.categories;
});

const reducer = createReducer(initialState, {
  [UPDATE_USER_FACE_AGING_CATEGORIES]: updateFaceAgingCategories,
});

export default reducer;
