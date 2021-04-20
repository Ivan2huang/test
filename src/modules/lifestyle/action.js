import actionCreator from '../../helpers/action';

export const GET_LIFESTYLE_DETAILS = 'GET_LIFESTYLE_DETAILS';
export const UPDATE_LIFESTYLE_DETAILS = 'UPDATE_LIFESTYLE_DETAILS';

export const getLifestyleDetails = actionCreator(GET_LIFESTYLE_DETAILS);
export const updateLifestyleDetails = actionCreator(
  UPDATE_LIFESTYLE_DETAILS,
  'lifestyleDetails',
);
