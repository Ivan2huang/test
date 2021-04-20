import actionCreator from '../../../helpers/action';

export const GET_NEWS_LETTER = 'GET_NEWS_LETTER';
export const UPDATE_NEWS_LETTER = 'UPDATE_NEWS_LETTER';

export const getNewsLetter = actionCreator(GET_NEWS_LETTER);
export const updateNewsLetter = actionCreator(UPDATE_NEWS_LETTER, 'content');
