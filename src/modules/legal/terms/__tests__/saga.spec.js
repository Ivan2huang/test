import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';

import termsSaga, { getTermsConditionsSaga, updateTermsSaga } from '../saga';
import { getTermsConditions, updateTermsAccepted } from '../api';
import { updateTermsConditions } from '../action';
import { getCookie } from '../../../../helpers/auth';
import { navigateTo } from '../../../../helpers/helpers';
import { updateMemberProfile } from '../../../me/action';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  getTermsConditions: jest.fn(),
  updateTermsAccepted: jest.fn(),
}));

jest.mock('../action', () => ({
  updateTermsConditions: payload => ({
    type: 'UPDATE_TERMS_CONDITIONS',
    payload,
  }),
  GET_TERMS_CONDITIONS: 'GET_TERMS_CONDITIONS',
  ACCEPT_TERMS: 'ACCEPT_TERMS',
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

jest.mock('../../../me/action', () => ({
  updateMemberProfile: jest.fn((action, payload) => ({
    action,
    payload,
  })),
}));

jest.mock('../../../../helpers/auth', () => ({
  getCookie: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    lifestyle: '/lifestyle',
    error: '/error',
  },
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-HK'),
}));

describe('Terms and conditions saga', () => {
  it('should watch action', () => {
    const generator = termsSaga();

    const next = generator.next();

    expect(next.value).toStrictEqual(
      takeLatest('GET_TERMS_CONDITIONS', getTermsConditionsSaga),
      takeLeading('ACCEPT_TERMS', updateTermsSaga),
    );
  });

  it('should handle get terms and conditions when user has already accepted terms', () => {
    const termsAndConditionResponse = ['Terms and conditions'];
    const saveTermsAndConditions = {};
    saveTermsAndConditions['zh-HK'] = 'Terms and conditions';
    const generator = getTermsConditionsSaga({
      payload: { alreadyAcceptedTerms: true },
    });

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(all([call(getTermsConditions, 'zh-HK')]));
    next = generator.next(termsAndConditionResponse);
    expect(next.value).toStrictEqual(
      put(updateTermsConditions(saveTermsAndConditions)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle get terms and conditions when user is not logged in', () => {
    getCookie.mockReturnValue(false);
    const termsAndConditionResponse = [
      'Terms and conditions',
      'Terms in Chinese',
    ];
    const saveTermsAndConditions = {};
    saveTermsAndConditions['en-HK'] = 'Terms and conditions';
    saveTermsAndConditions['zh-HK'] = 'Terms in Chinese';
    const generator = getTermsConditionsSaga({
      payload: { alreadyAcceptedTerms: false },
    });

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      all([
        call(getTermsConditions, 'en-HK'),
        call(getTermsConditions, 'zh-HK'),
      ]),
    );
    next = generator.next(termsAndConditionResponse);
    expect(next.value).toStrictEqual(
      put(updateTermsConditions(saveTermsAndConditions)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual('STOP_LOADER');
    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  it('should handle update accept terms for success', () => {
    const generator = updateTermsSaga({
      payload: {
        alreadyAcceptedEdm: false,
      },
    });

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(updateTermsAccepted, false));
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateMemberProfile({ isTermsAccepted: true, isEdmOptedOut: false })),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(call(navigateTo, '/lifestyle'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('should handle update accept terms if error occurs', () => {
    const generator = updateTermsSaga({
      payload: {
        alreadyAcceptedTerms: false,
      },
    });

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toStrictEqual(call(updateTermsAccepted, false));
    next = generator.next({ error: true });
    expect(next.value).toStrictEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.done).toEqual(true);
  });
});
