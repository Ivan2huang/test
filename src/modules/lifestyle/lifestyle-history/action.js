import actionCreator from '../../../helpers/action';

export const GET_LIFESTYLE_HEALTH_SCORES_HISTORY =
  'GET_LIFESTYLE_HEALTH_SCORES_HISTORY';
export const UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY =
  'UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY';

export const getLifestyleHealthScoresHistory = actionCreator(
  GET_LIFESTYLE_HEALTH_SCORES_HISTORY,
);
export const updateLifestyleHealthScoresHistory = actionCreator(
  UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY,
  'healthScoresHistory',
);
