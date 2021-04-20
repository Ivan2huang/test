import actionCreator from '../../../helpers/action';

export const SUBMIT_LIFESTYLE_QUESTIONNAIRE = 'SUBMIT_LIFESTYLE_QUESTIONNAIRE';

export const GET_FACE_AGING_IMAGE = 'GET_FACE_AGING_IMAGE';

export const UPDATE_FACE_AGING_IMAGE = 'UPDATE_FACE_AGING_IMAGE';

export const TOGGLE_ERROR_MODAL = 'TOGGLE_ERROR_MODAL';

export const getFaceAgingImage = actionCreator(GET_FACE_AGING_IMAGE);

export const submitLifeStyleQuestionnaire = actionCreator(
  SUBMIT_LIFESTYLE_QUESTIONNAIRE,
  'data',
);

export const updateFaceAgingImage = actionCreator(
  UPDATE_FACE_AGING_IMAGE,
  'image',
);

export const toggleErrorModal = actionCreator(TOGGLE_ERROR_MODAL, 'error');
