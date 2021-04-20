import actionCreator from '../../../helpers/action';

export const GET_USER_FACE_AGING_CATEGORIES = 'GET_USER_FACE_AGING_CATEGORIES';
export const UPDATE_USER_FACE_AGING_CATEGORIES =
  'UPDATE_USER_FACE_AGING_CATEGORIES';
export const DELETE_FACE_AGING_IMAGE = 'DELETE_FACE_AGING_IMAGE';

export const getUserFaceAgingCategories = actionCreator(
  GET_USER_FACE_AGING_CATEGORIES,
);
export const updateUserFaceAgingCategories = actionCreator(
  UPDATE_USER_FACE_AGING_CATEGORIES,
  'faceAgingIsDone',
  'categories',
);

export const deleteFaceAgingImage = actionCreator(DELETE_FACE_AGING_IMAGE);
