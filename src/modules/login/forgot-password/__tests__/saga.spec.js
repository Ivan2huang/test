import { all, call, takeLeading, put } from 'redux-saga/effects';

import forgotPasswordSaga, { forgotPassword } from '../saga';
import { forgotPassword as forgotPasswordApi } from '../api';
import { navigateTo } from '../../../../helpers/helpers';
import { updateError } from '../../../error/action';

jest.mock('../action', () => ({
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
}));

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield ['STOP_LOADER', id];
  },
}));

jest.mock('../api', () => ({
  forgotPassword: jest.fn(),
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    forgotPasswordSuccess: '/forgotPasswordSuccess',
    error: '/error',
    resetPasswordAccountLocked: '/resetPasswordAccountLocked',
  },
}));

describe('ForgotPassword Saga', () => {
  it('should watch actions', () => {
    const generator = forgotPasswordSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([takeLeading('FORGOT_PASSWORD', forgotPassword)]),
    );
  });

  it('should handle success scenario for forgot password', () => {
    const action = {
      type: 'FORGOT_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        verify: true,
      },
    };

    const generator = forgotPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(forgotPasswordApi, 'dummy@test.com', true));
    next = generator.next('');
    expect(next.value).toEqual(
      call(navigateTo, '/forgotPasswordSuccess', {
        email: 'dummy@test.com',
        verify: true,
      }),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for forgot password', () => {
    const action = {
      type: 'FORGOT_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        verify: false,
      },
    };
    const payload = {
      error: true,
    };

    const generator = forgotPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(forgotPasswordApi, 'dummy@test.com', false),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for locked account', () => {
    const action = {
      type: 'FORGOT_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        verify: false,
      },
    };
    const payload = {
      error: true,
      messageKey: 'AccountLocked',
      message: 'message',
    };

    const generator = forgotPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(forgotPasswordApi, 'dummy@test.com', false),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(put(updateError('accountLocked', 'message')));
    next = generator.next();
    expect(next.value).toEqual(call(navigateTo, '/resetPasswordAccountLocked'));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });
});
