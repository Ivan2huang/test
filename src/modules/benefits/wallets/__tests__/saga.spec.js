import { all, call, takeLeading, put } from 'redux-saga/effects';

import walletSaga, { getWalletsSaga } from '../saga';
import { updateWallets, disableWallets } from '../action';
import { getWallets, getCurrentPlanYear } from '../api';

jest.mock('../action', () => ({
  GET_WALLETS: 'GET_WALLETS',
  disableWallets: jest.fn((action, payload) => ({
    action,
    payload,
  })),
  updateWallets: jest.fn((action, payload) => ({
    action,
    payload,
  })),
}));

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  getWallets: jest.fn(),
  getCurrentPlanYear: jest.fn(),
}));

describe('Wallet saga', () => {
  it('should watch actions', () => {
    const generator = walletSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([takeLeading('GET_WALLETS', getWalletsSaga)]),
    );
  });

  describe('getWalletsSaga saga', () => {
    it('should disable wallet if all wallet data has no balance', () => {
      const action = {
        type: 'GET_WALLETS',
        payload: {
          includeDependents: false,
        },
      };
      const generator = getWalletsSaga(action);

      let next = generator.next();

      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([call(getWallets, false), call(getCurrentPlanYear)]),
      );

      next = generator.next([{}, {}]);
      expect(next.value).toEqual(put(disableWallets()));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should handle getWalletsSaga saga success scenario with validata', () => {
      const action = {
        type: 'GET_WALLETS',
        payload: {
          includeDependents: false,
        },
      };
      const generator = getWalletsSaga(action);

      let next = generator.next();

      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([call(getWallets, false), call(getCurrentPlanYear)]),
      );

      next = generator.next([{ member: { balance: 0 } }, {}]);
      expect(next.value).toEqual(
        put(updateWallets({ member: { balance: 0 } }, {})),
      );

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should handle getWalletsSaga preference saga error scenario', () => {
      const action = {
        type: 'GET_WALLETS',
        payload: {
          includeDependents: false,
        },
      };
      const generator = getWalletsSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([call(getWallets, false), call(getCurrentPlanYear)]),
      );

      next = generator.next([{ error: true }]);
      expect(next.value).toEqual(put(updateWallets({}, {})));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should disable wallet if ACCOUNT NOT FOUND ERROR', () => {
      const action = {
        type: 'GET_WALLETS',
        payload: {
          includeDependents: false,
        },
      };
      const generator = getWalletsSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([call(getWallets, false), call(getCurrentPlanYear)]),
      );

      next = generator.next([{ error: true, messageKey: 'ACCOUNT_NOT_FOUND' }]);
      expect(next.value).toEqual(put(disableWallets()));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should disable wallet if BALANCE_NOT_FOUND ERROR', () => {
      const action = {
        type: 'GET_WALLETS',
        payload: {
          includeDependents: false,
        },
      };
      const generator = getWalletsSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([call(getWallets, false), call(getCurrentPlanYear)]),
      );

      next = generator.next([{ error: true, messageKey: 'BALANCE_NOT_FOUND' }]);
      expect(next.value).toEqual(put(disableWallets()));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });
  });
});
