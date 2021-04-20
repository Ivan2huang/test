import { all, call, put, takeLatest } from 'redux-saga/effects';

import privacyPolicySaga, { getPrivacyPolicySaga } from '../saga';
import getPrivacyPolicy from '../api';
import { updatePrivacyPolicy } from '../action';

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
  updatePrivacyPolicy: payload => ({
    type: 'UPDATE_PRIVACY_POLICY',
    payload,
  }),
  GET_PRIVACY_POLICY: 'GET_PRIVACY_POLICY',
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

jest.mock('../../../../helpers/auth', () => ({
  getCookie: jest.fn(),
}));

jest.mock('../../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-HK'),
}));

describe('Legal contents saga', () => {
  it('should watch action', () => {
    const generator = privacyPolicySaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_PRIVACY_POLICY', getPrivacyPolicySaga),
    );
  });

  it('should handle get privacy policy', () => {
    const privacyPolicyResponse = ['english content', 'chinese content'];
    const savePrivacyPolicy = {
      'en-HK': 'english content',
      'zh-HK': 'chinese content',
    };

    const generator = getPrivacyPolicySaga({
      payload: { locales: ['en-HK', 'zh-HK'] },
    });

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      all([call(getPrivacyPolicy, 'en-HK'), call(getPrivacyPolicy, 'zh-HK')]),
    );
    next = generator.next(privacyPolicyResponse);
    expect(next.value).toStrictEqual(
      put(updatePrivacyPolicy(savePrivacyPolicy)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });
});
