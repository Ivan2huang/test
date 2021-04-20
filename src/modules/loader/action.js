import actionCreator from '../../helpers/action';

export const START_LOADER = 'START_LOADER';
export const STOP_LOADER = 'STOP_LOADER';

export const startLoader = actionCreator(START_LOADER, 'id', 'message');
export const stopLoader = actionCreator(STOP_LOADER, 'id');
