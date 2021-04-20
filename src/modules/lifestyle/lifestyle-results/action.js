import actionCreator from '../../../helpers/action';

export const GET_LIFESTYLE_RESULTS = 'GET_LIFESTYLE_RESULTS';
export const UPDATE_LIFESTYLE_RESULTS = 'UPDATE_LIFESTYLE_RESULTS';

export const getLifestyleResults = actionCreator(GET_LIFESTYLE_RESULTS);
export const updateLifestyleResults = actionCreator(
  UPDATE_LIFESTYLE_RESULTS,
  'results',
);
