/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import {
  UPDATE_RECOMMENDATIONS,
  UPDATE_SUGGESTION_RECOMMENDATIONS,
} from './action';

const initialState = {
  details: [],
  suggestions: [],
};

const updateRecommendations = produce((draft, action) => {
  const { recommendations } = action.payload;
  draft.details = recommendations;
});

const updateSuggestionRecommendations = produce((draft, action) => {
  const { recommendations } = action.payload;
  draft.suggestions = recommendations;
});

const reducer = createReducer(initialState, {
  [UPDATE_RECOMMENDATIONS]: updateRecommendations,
  [UPDATE_SUGGESTION_RECOMMENDATIONS]: updateSuggestionRecommendations,
});

export default reducer;
