/* eslint-disable no-param-reassign */
import produce from 'immer';

import createReducer from '../../../helpers/reducer';
import { UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY } from './action';

const initialState = {
  healthScoresHistory: [],
};

const updateLifestyleHealthScoresHistory = produce((draft, action) => {
  const { healthScoresHistory } = action.payload;
  draft.healthScoresHistory = healthScoresHistory;
});

const reducer = createReducer(initialState, {
  [UPDATE_LIFESTYLE_HEALTH_SCORES_HISTORY]: updateLifestyleHealthScoresHistory,
});

export default reducer;
