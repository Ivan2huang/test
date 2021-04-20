import { all, takeLatest, call, put } from 'redux-saga/effects';

import recommendations, {
  getRecommendationsSaga,
  getSuggestionRecommendationsSaga,
} from '../saga';
import { updateError } from '../../../error/action';
import ERROR from '../../../../constants/error';
import LOADER from '../../../../constants/loader';
import { getRecommendations } from '../api';
import {
  updateRecommendations,
  updateSuggestionRecommendations,
} from '../action';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  getRecommendations: jest.fn(),
}));

jest.mock('../action', () => ({
  GET_RECOMMENDATIONS: 'GET_RECOMMENDATIONS',
  updateRecommendations: payload => ({
    type: 'UPDATE_RECOMMENDATIONS',
    payload,
  }),
  GET_SUGGESTION_RECOMMENDATIONS: 'GET_SUGGESTION_RECOMMENDATIONS',
  updateSuggestionRecommendations: payload => ({
    type: 'UPDATE_SUGGESTION_RECOMMENDATIONS',
    payload,
  }),
}));

jest.mock('../../../error/action', () => ({
  updateError: (id, state) => ({
    type: 'UPDATE_ERROR',
    payload: {
      id,
      state,
    },
  }),
}));

jest.mock('../../../../constants/loader', () => ({
  recommendations: 'test loader',
}));

jest.mock('../../../../constants/error', () => ({
  recommendations: 'test error',
}));

describe('Recommendations Saga', () => {
  it('should watch action', () => {
    const generator = recommendations();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLatest('GET_RECOMMENDATIONS', getRecommendationsSaga),
        takeLatest(
          'GET_SUGGESTION_RECOMMENDATIONS',
          getSuggestionRecommendationsSaga,
        ),
      ]),
    );
  });

  it('should handle get recommendations in success scenario', () => {
    const recommendationsResponse = {
      recommendations: [{ title: 'text' }],
    };
    const action = {
      type: 'GET_RECOMMENDATIONS',
      payload: {
        tipCategory: 'alcohol',
      },
    };
    const generator = getRecommendationsSaga(action);

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', LOADER.recommendations]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.recommendations, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getRecommendations, 'alcohol'));
    next = generator.next(recommendationsResponse);
    expect(next.value).toStrictEqual(
      put(updateRecommendations(recommendationsResponse)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get recommendations in error scenario', () => {
    const action = {
      type: 'GET_RECOMMENDATIONS',
      payload: {
        tipCategory: 'alcohol',
      },
    };
    const generator = getRecommendationsSaga(action);

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', LOADER.recommendations]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.recommendations, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getRecommendations, 'alcohol'));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.recommendations, true)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get suggestions in success scenario', () => {
    const recommendationsResponse = {
      recommendations: [{ title: 'text' }],
    };
    const action = {
      type: 'GET_SUGGESTION_RECOMMENDATIONS',
      payload: {},
    };
    const generator = getSuggestionRecommendationsSaga(action);

    let next = generator.next();

    expect(next.value).toStrictEqual([
      'START_LOADER',
      LOADER.suggestionRecommendations,
    ]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.suggestionRecommendations, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getRecommendations));
    next = generator.next(recommendationsResponse);
    expect(next.value).toStrictEqual(
      put(updateSuggestionRecommendations(recommendationsResponse)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get suggestions in error scenario', () => {
    const action = {
      type: 'GET_SUGGESTION_RECOMMENDATIONS',
      payload: {},
    };
    const generator = getSuggestionRecommendationsSaga(action);

    let next = generator.next();

    expect(next.value).toStrictEqual([
      'START_LOADER',
      LOADER.suggestionRecommendations,
    ]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.suggestionRecommendations, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getRecommendations));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.suggestionRecommendations, true)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
