/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_FACE_AGING_IMAGE, TOGGLE_ERROR_MODAL } from './action';

const initialState = {
  faceAgingImage: null,
  faceAgingImageError: false,
};

const updateFaceAgingImage = produce((draft, action) => {
  const { image } = action.payload;
  draft.faceAgingImage = image;
});

const toggleErrorModal = produce((draft, action) => {
  const { error } = action.payload;
  draft.faceAgingImageError = error;
});

const reducer = createReducer(initialState, {
  [UPDATE_FACE_AGING_IMAGE]: updateFaceAgingImage,
  [TOGGLE_ERROR_MODAL]: toggleErrorModal,
});

export default reducer;
