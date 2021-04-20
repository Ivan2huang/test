import actionCreator from '../../../helpers/action';

export const GET_LIFESTYLE_SCORE = 'GET_LIFESTYLE_SCORE';

export const UPDATE_LIFESTYLE_SCORE = 'UPDATE_LIFESTYLE_SCORE';

export const getLifestyleScore = actionCreator(GET_LIFESTYLE_SCORE);

export const updateLifestyleScore = actionCreator(
  UPDATE_LIFESTYLE_SCORE,
  'healthScore',
);
