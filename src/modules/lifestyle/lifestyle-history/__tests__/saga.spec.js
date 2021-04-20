import { takeLatest, call, put } from 'redux-saga/effects';

import lifeStyleHistorySaga, {
  getLifestyleHealthScoreHistorySaga,
} from '../saga';
import getLifestyleHealthScoreHistory from '../api';
import { updateLifestyleHealthScoresHistory } from '../action';
import { updateError } from '../../../error/action';
import ERROR from '../../../../constants/error';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../action', () => ({
  updateLifestyleHealthScoresHistory: payload => ({
    type: 'UPDATE_LIFESTYLE_TIPS',
    payload,
  }),
  GET_LIFESTYLE_HEALTH_SCORES_HISTORY: 'GET_LIFESTYLE_HEALTH_SCORES_HISTORY',
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

describe('Lifestyle history saga', () => {
  it('should watch action', () => {
    const generator = lifeStyleHistorySaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest(
        'GET_LIFESTYLE_HEALTH_SCORES_HISTORY',
        getLifestyleHealthScoreHistorySaga,
      ),
    );
  });

  it('should handle get lifestyle tips in success scenario', () => {
    const lifestyleHealthScoreHistoryResponse = {
      tips: [{ title: 'text' }],
    };
    const generator = getLifestyleHealthScoreHistorySaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'lifestyleHistory']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.lifestyleHistory, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getLifestyleHealthScoreHistory));
    next = generator.next(lifestyleHealthScoreHistoryResponse);
    expect(next.value).toStrictEqual(
      put(
        updateLifestyleHealthScoresHistory(lifestyleHealthScoreHistoryResponse),
      ),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get lifestyle tips in error scenario', () => {
    const generator = getLifestyleHealthScoreHistorySaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'lifestyleHistory']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.lifestyleHistory, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getLifestyleHealthScoreHistory));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.lifestyleHistory, true)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
