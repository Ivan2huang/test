/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_NEWS_LETTER } from './action';

const initialState = { content: {} };

const updateNewsLetter = produce((draft, action) => {
  draft.content = action.payload.content;
});

const reducer = createReducer(initialState, {
  [UPDATE_NEWS_LETTER]: updateNewsLetter,
});

export default reducer;
