import { takeLatest, call, put } from 'redux-saga/effects';

import lifestyleResultsSaga, { getLifestyleResultsSaga } from '../saga';
import getLifestyleResults from '../api';
import { updateLifestyleResults } from '../action';
import { updateError } from '../../../error/action';
import ERROR from '../../../../constants/error';
import LOADER from '../../../../constants/loader';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../../../../constants/loader', () => ({
  lifestyleResults: 'test loader',
}));

jest.mock('../../../../constants/error', () => ({
  lifestyleResults: 'test error',
}));

jest.mock('../api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../action', () => ({
  updateLifestyleResults: payload => ({
    type: 'UPDATE_LIFESTYLE_RESULTS',
    payload,
  }),
  GET_LIFESTYLE_RESULTS: 'GET_LIFESTYLE_RESULTS',
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

describe('General results saga', () => {
  it('should watch action', () => {
    const generator = lifestyleResultsSaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_LIFESTYLE_RESULTS', getLifestyleResultsSaga),
    );
  });

  it('should handle get lifestyle results in success scenario', () => {
    const lifestyleResultsResponse = {
      lifestyleResults: [{ title: 'text' }],
    };
    const generator = getLifestyleResultsSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', LOADER.lifestyleResults]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.lifestyleResults, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getLifestyleResults));
    next = generator.next(lifestyleResultsResponse);
    expect(next.value).toStrictEqual(
      put(updateLifestyleResults(lifestyleResultsResponse)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get lifestyle results in error scenario', () => {
    const generator = getLifestyleResultsSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', LOADER.lifestyleResults]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.lifestyleResults, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getLifestyleResults));
    next = generator.next({ error: 'error occurred' });
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.lifestyleResults, true)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
