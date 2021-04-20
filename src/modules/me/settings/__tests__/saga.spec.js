import { all, call, takeLeading, put } from 'redux-saga/effects';

import settingsSaga, {
  updateLanguagePreferenceSaga,
  updateSettingsSaga,
  resetPasswordSaga,
} from '../saga';
import {
  UPDATE_LANGUAGE_PREFERENCE,
  UPDATE_SETTINGS,
  SETTING_RESET_PASSWORD,
  updateResetPasswordResult,
} from '../action';
import updateLanguagePreference, {
  updateSettings,
  updateCookieLanguage,
  resetPassword,
} from '../api';
import { getMemberProfileWithMembershipNumber } from '../../action';
import appContext from '../../../../appContext';
import { navigateTo } from '../../../../helpers/helpers';
import paths from '../../../../helpers/paths';
import { getCookie } from '../../../../helpers/auth';

jest.mock('../../../../helpers/auth', () => ({
  getCookie: jest.fn(),
}));

jest.mock('../../action', () => ({
  getMemberProfileWithMembershipNumber: jest.fn((action, payload) => ({
    action,
    payload,
  })),
}));

jest.mock('../../../../appContext', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    error: '/error',
  },
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

describe('Settings saga', () => {
  it('should watch actions', () => {
    const generator = settingsSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLeading(UPDATE_LANGUAGE_PREFERENCE, updateLanguagePreferenceSaga),
        takeLeading(UPDATE_SETTINGS, updateSettingsSaga),
        takeLeading(SETTING_RESET_PASSWORD, resetPasswordSaga),
      ]),
    );
  });

  describe('updateLanguage preference saga', () => {
    it('should handle updateLanguage preference saga success scenario', () => {
      getCookie.mockReturnValueOnce('userId');
      const setLocaleCallback = jest.fn();
      const action = {
        type: 'UPDATE_LANGUAGE_PREFERENCE',
        payload: {
          language: 'en-HK',
          setLocaleCallback,
        },
      };
      const generator = updateLanguagePreferenceSaga(action);

      let next = generator.next();

      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([
          call(updateLanguagePreference, 'en-HK'),
          call(updateCookieLanguage, 'en-HK'),
        ]),
      );

      next = generator.next([]);
      expect(setLocaleCallback).toHaveBeenCalled();
      expect(setLocaleCallback).toHaveBeenCalledWith('en-HK');
      expect(appContext).toHaveBeenCalled();
      expect(next.value).toEqual(put(getMemberProfileWithMembershipNumber()));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should not call api to update language when there is no userId', () => {
      const setLocaleCallback = jest.fn();
      const action = {
        type: 'UPDATE_LANGUAGE_PREFERENCE',
        payload: {
          language: 'en-HK',
          setLocaleCallback,
        },
      };
      const generator = updateLanguagePreferenceSaga(action);

      let next = generator.next();

      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([undefined, call(updateCookieLanguage, 'en-HK')]),
      );

      next = generator.next([]);
      expect(setLocaleCallback).toHaveBeenCalled();
      expect(setLocaleCallback).toHaveBeenCalledWith('en-HK');
      expect(appContext).toHaveBeenCalled();

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should handle updateLanguage preference saga error scenario', () => {
      const setLocaleCallback = jest.fn();
      getCookie.mockReturnValueOnce('userId');
      const action = {
        type: 'UPDATE_LANGUAGE_PREFERENCE',
        payload: {
          language: 'en-HK',
          setLocaleCallback,
        },
      };
      const generator = updateLanguagePreferenceSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        all([
          call(updateLanguagePreference, 'en-HK'),
          call(updateCookieLanguage, 'en-HK'),
        ]),
      );

      next = generator.next([{ error: true }]);
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith(paths.common.error);
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });
  });

  describe('update settings saga', () => {
    it('should handle update settings saga success scenario', () => {
      const action = {
        type: 'UPDATE_SETTINGS',
        payload: {
          settings: {
            isEdmOptedOut: false,
          },
        },
      };
      const generator = updateSettingsSaga(action);

      let next = generator.next();

      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        call(updateSettings, { isEdmOptedOut: false }),
      );

      next = generator.next();
      expect(next.value).toEqual(put(getMemberProfileWithMembershipNumber()));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should handle updateLanguage preference saga error scenario', () => {
      const action = {
        type: 'UPDATE_SETTINGS',
        payload: {
          settings: {
            isEdmOptedOut: false,
          },
        },
      };
      const generator = updateSettingsSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        call(updateSettings, { isEdmOptedOut: false }),
      );

      next = generator.next({ error: true });
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith(paths.common.error);
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });
  });

  describe('reset password saga', () => {
    it('should handle reset password saga success scenario', () => {
      const action = {
        type: 'SETTING_RESET_PASSWORD',
        payload: {},
      };
      const generator = resetPasswordSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(call(resetPassword));

      next = generator.next();
      expect(next.value).toEqual(put(updateResetPasswordResult(true)));

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });

    it('should handle reset password saga error scenario', () => {
      const action = {
        type: 'SETTING_RESET_PASSWORD',
        payload: {},
      };
      const generator = resetPasswordSaga(action);

      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(call(resetPassword));

      next = generator.next({ error: true });
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith(paths.common.error);
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.done).toEqual(true);
    });
  });
});
