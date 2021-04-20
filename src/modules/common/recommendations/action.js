import actionCreator from '../../../helpers/action';

export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';
export const UPDATE_RECOMMENDATIONS = 'UPDATE_RECOMMENDATIONS';
export const GET_SUGGESTION_RECOMMENDATIONS = 'GET_SUGGESTION_RECOMMENDATIONS';
export const UPDATE_SUGGESTION_RECOMMENDATIONS =
  'UPDATE_SUGGESTION_RECOMMENDATIONS';

export const getRecommendations = actionCreator(
  GET_RECOMMENDATIONS,
  'tipCategory',
);

export const updateRecommendations = actionCreator(
  UPDATE_RECOMMENDATIONS,
  'recommendations',
);

export const getSuggestionRecommendations = actionCreator(
  GET_SUGGESTION_RECOMMENDATIONS,
);

export const updateSuggestionRecommendations = actionCreator(
  UPDATE_SUGGESTION_RECOMMENDATIONS,
  'recommendations',
);
