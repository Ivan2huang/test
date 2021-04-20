/* eslint-disable no-param-reassign */
import produce from 'immer';
import { UPDATE_LIFESTYLE_SCORE } from './action';
import createReducer from '../../../helpers/reducer';

const initilaState = {
  healthScore: null,
};

const updateLifestyleScore = produce((draft, action) => {
  const { healthScore } = action.payload;
  draft.healthScore = healthScore;
});

const reducer = createReducer(initilaState, {
  [UPDATE_LIFESTYLE_SCORE]: updateLifestyleScore,
});

export default reducer;
