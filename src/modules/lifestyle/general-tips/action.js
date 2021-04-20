import actionCreator from '../../../helpers/action';

export const GET_LIFESTYLE_TIPS = 'GET_LIFESTYLE_TIPS';
export const UPDATE_LIFESTYLE_TIPS = 'UPDATE_LIFESTYLE_TIPS';

export const getLifestyleTips = actionCreator(GET_LIFESTYLE_TIPS);
export const updateLifestyleTips = actionCreator(UPDATE_LIFESTYLE_TIPS, 'tips');
