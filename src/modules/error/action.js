import actionCreator from '../../helpers/action';

export const UPDATE_ERROR = 'UPDATE_ERROR';

export const updateError = actionCreator(UPDATE_ERROR, 'id', 'errorState');
