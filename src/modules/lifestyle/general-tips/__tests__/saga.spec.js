import { takeLatest, call, put } from 'redux-saga/effects';

import generalTipsSaga, { getLifestyleTipsSaga } from '../saga';
import getLifestyleTips from '../api';
import { updateLifestyleTips } from '../action';
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

jest.mock('../api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../action', () => ({
  updateLifestyleTips: payload => ({
    type: 'UPDATE_LIFESTYLE_TIPS',
    payload,
  }),
  GET_LIFESTYLE_TIPS: 'GET_LIFESTYLE_TIPS',
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
  generalTips: 'test loader',
}));

jest.mock('../../../../constants/error', () => ({
  generalTips: 'test error',
}));

describe('General tips saga', () => {
  it('should watch action', () => {
    const generator = generalTipsSaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_LIFESTYLE_TIPS', getLifestyleTipsSaga),
    );
  });

  it('should handle get lifestyle tips in success scenario', () => {
    const lifestyleTipsResponse = {
      tips: [{ title: 'text' }],
    };
    const generator = getLifestyleTipsSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', LOADER.generalTips]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.generalTips, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getLifestyleTips));
    next = generator.next(lifestyleTipsResponse);
    expect(next.value).toStrictEqual(
      put(updateLifestyleTips(lifestyleTipsResponse)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get lifestyle tips in error scenario', () => {
    const generator = getLifestyleTipsSaga();

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', LOADER.generalTips]);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.generalTips, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(getLifestyleTips));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(put(updateError(ERROR.generalTips, true)));
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
