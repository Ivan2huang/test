import { put, call, takeLatest } from 'redux-saga/effects';

import lifestyleScoreSaga, { getLifestyleScoreSaga } from '../saga';
import getLifestyleScore from '../api';
import { updateLifestyleScore } from '../action';
import { updateError } from '../../../error/action';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../action', () => ({
  updateLifestyleScore: score => score,
  GET_LIFESTYLE_SCORE: 'GET_LIFESTYLE_SCORE',
}));

jest.mock('../../../error/action', () => ({
  updateError: (id, state) => ({
    id,
    state,
  }),
}));

describe('Lifestyle score saga', () => {
  jest.mock('../api', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

  it('should watch action', () => {
    const generator = lifestyleScoreSaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_LIFESTYLE_SCORE', getLifestyleScoreSaga),
    );
  });

  it('should handle lifestyle score in success scenario', () => {
    const lifestyleScoreApiResponse = {
      score: 36.0,
      requestId: null,
    };

    const generator = getLifestyleScoreSaga();
    const startLoader = generator.next();
    const hideError = generator.next();
    const lifestyleScoreApiCall = generator.next();
    const saveHealthScore = generator.next(lifestyleScoreApiResponse);
    const stopLoader = generator.next();
    const finishGenerator = generator.next();

    expect(startLoader.value).toStrictEqual(['START_LOADER', 'lifestyleScore']);
    expect(hideError.value).toStrictEqual(
      put(updateError('lifestyleScore', false)),
    );
    expect(lifestyleScoreApiCall.value).toStrictEqual(call(getLifestyleScore));
    expect(saveHealthScore.value).toStrictEqual(
      put(updateLifestyleScore(36.0)),
    );
    expect(stopLoader.value).toStrictEqual('STOP_LOADER');
    expect(finishGenerator.value).toBeUndefined();
    expect(finishGenerator.done).toBeTruthy();
  });

  it('should handle lifestyle score in error scenario', () => {
    const lifestyleScoreApiResponse = { error: 'error occurred' };

    const generator = getLifestyleScoreSaga();
    const startLoader = generator.next();
    const hideError = generator.next();
    const lifestyleScoreApiCall = generator.next();
    const showError = generator.next(lifestyleScoreApiResponse);
    const stopLoader = generator.next();
    const finishGenerator = generator.next();

    expect(startLoader.value).toStrictEqual(['START_LOADER', 'lifestyleScore']);
    expect(hideError.value).toStrictEqual(
      put(updateError('lifestyleScore', false)),
    );
    expect(lifestyleScoreApiCall.value).toStrictEqual(call(getLifestyleScore));
    expect(showError.value).toStrictEqual(
      put(updateError('lifestyleScore', true)),
    );
    expect(stopLoader.value).toStrictEqual('STOP_LOADER');
    expect(finishGenerator.value).toBeUndefined();
    expect(finishGenerator.done).toBeTruthy();
  });
});
