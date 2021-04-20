import { all, call, put, takeLeading } from 'redux-saga/effects';

import resetPasswordSaga, {
  resetPassword,
  validateResetPasswordRequest,
  getProductNameSaga,
} from '../saga';
import {
  resetPassword as resetPasswordApi,
  validateResetPasswordRequest as validateResetPasswordRequestApi,
} from '../api';
import { navigateTo } from '../../../../helpers/helpers';
import { updateError } from '../../../error/action';
import ERROR from '../../../../constants/error';

jest.mock('../action', () => ({
  RESET_PASSWORD: 'RESET_PASSWORD',
  VALIDATE_RESET_PASSWORD_REQUEST: 'VALIDATE_RESET_PASSWORD_REQUEST',
  GET_PRODUCT_NAME: 'GET_PRODUCT_NAME',
}));

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield ['STOP_LOADER', id];
  },
}));

jest.mock('../api', () => ({
  resetPassword: jest.fn(),
  validateResetPasswordRequest: jest.fn(),
  getProductName: jest.fn(),
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    resetPasswordSuccess: '/resetPasswordSuccess',
    resetPasswordLinkExpired: '/resetPasswordLinkExpired',
    resetPasswordAccountLocked: '/resetPasswordAccountLocked',
    onBoardingSuccess: '/onBoardingSuccess',
    error: '/error',
  },
}));

describe('resetPassword Saga', () => {
  it('should watch actions', () => {
    const generator = resetPasswordSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLeading('RESET_PASSWORD', resetPassword),
        takeLeading(
          'VALIDATE_RESET_PASSWORD_REQUEST',
          validateResetPasswordRequest,
        ),
        takeLeading('GET_PRODUCT_NAME', getProductNameSaga),
      ]),
    );
  });

  it('should handle success scenario for reset password', () => {
    const action = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        isFirstTimeUser: false,
        clientId: 'clientA',
      },
    };

    const generator = resetPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(resetPasswordApi, 'clientA', {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        isFirstTimeUser: false,
      }),
    );
    next = generator.next('');
    expect(next.value).toEqual(call(navigateTo, '/resetPasswordSuccess'));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle success scenario for reset password for first time user', () => {
    const action = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        isFirstTimeUser: true,
        clientId: 'clientA',
      },
    };

    const generator = resetPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(resetPasswordApi, 'clientA', {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        isFirstTimeUser: true,
      }),
    );
    next = generator.next('');
    expect(next.value).toEqual(
      call(navigateTo, '/onBoardingSuccess', { productName: undefined }),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle success scenario for validating reset password request', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'dummy@test.com',
        token: '123',
        clientId: 'clientA',
      },
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for reset password', () => {
    const action = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'FakeToken',
      message: 'Fake Token',
    };

    const generator = resetPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(resetPasswordApi, 'clientA', {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for reset password validation request', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'dummy@test.com',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'FakeToken',
      message: 'Fake Token',
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for expired link', () => {
    const action = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'TokenExpired',
      message: 'Reset password link expired',
    };

    const generator = resetPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(resetPasswordApi, 'clientA', {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      call(navigateTo, '/resetPasswordLinkExpired', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for invalid token', () => {
    const action = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'InvalidToken',
      message: 'Invalid Token',
    };

    const generator = resetPassword(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(
      call(resetPasswordApi, 'clientA', {
        email: 'dummy@test.com',
        password: 'Test@123',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      call(navigateTo, '/resetPasswordLinkExpired', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for expired link during validation', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'dummy@test.com',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'TokenExpired',
      message: 'Reset password link expired',
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      call(navigateTo, '/resetPasswordLinkExpired', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for locked account during validation', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'dummy@test.com',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'AccountLocked',
      message: 'AccountLocked message',
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.accountLocked, payload.message)),
    );
    next = generator.next();
    expect(next.value).toEqual(call(navigateTo, '/resetPasswordAccountLocked'));
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for IncorrectDOB during validation', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'dummy@test.com',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'IncorrectDOB',
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, true)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for EmptyDOB during validation', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'dummy@test.com',
        token: '123',
        clientId: 'clientA',
      },
    };
    const payload = {
      error: true,
      messageKey: 'EmptyDOB',
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', {
        email: 'dummy@test.com',
        token: '123',
      }),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle success scenario for verifying dob during validation', () => {
    const action = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        isVerifyingDoB: true,
        dateOfBirth: '',
        clientId: 'clientA',
      },
    };
    const payload = {
      dateOfBirth: '',
    };

    const generator = validateResetPasswordRequest(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, null)),
    );

    next = generator.next();
    expect(next.value).toEqual(
      call(validateResetPasswordRequestApi, 'clientA', payload),
    );
    next = generator.next(payload);
    expect(next.value).toEqual(
      put(updateError(ERROR.resetPassword.dateOfBirthMatch, false)),
    );
    next = generator.next();
    expect(next.value).toStrictEqual(['STOP_LOADER', 'page']);
    next = generator.next();
    expect(next.done).toBe(true);
  });
});
