import { all, call, put, takeLeading } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';

import accountActivationSaga, {
  checkOTPStatusSaga,
  resend,
  verify,
} from '../saga';
import { updateOTPStatus, checkOTPStatus } from '../action';
import {
  resendOTPRequest,
  requestOTPVerificationStatus,
  requestOTPVerification,
} from '../api';
import { navigateTo } from '../../../../helpers/helpers';

jest.mock('../api', () => ({
  resendOTPRequest: jest.fn(),
  requestOTPVerification: jest.fn(),
  requestOTPVerificationStatus: jest.fn(),
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    accountActivationError: '/account-activation/error',
    renewToken: '/renew-token',
    error: '/error',
  },
}));

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

describe('Account Activation Saga', () => {
  it('should watch actions', () => {
    const generator = accountActivationSaga();
    let next = generator.next();
    expect(next.value).toEqual(all([takeLeading('VERIFY', verify)]));
    next = generator.next();
    expect(next.value).toEqual(all([takeLeading('RESEND', resend)]));
    next = generator.next();
    expect(next.value).toEqual(
      all([takeLeading('CHECK_OTP_STATUS', checkOTPStatusSaga)]),
    );
  });

  it('should request resend otp code', () => {
    const generator = resend();
    const successRes = {};
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(resendOTPRequest));
    next = generator.next(successRes);
    expect(next.value).toEqual(put(checkOTPStatus()));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should not disabled resend button if request resend otp code failed', () => {
    const generator = resend();
    const failedRes = { error: true };
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(resendOTPRequest));
    next = generator.next(failedRes);
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should request check otp status', () => {
    const generator = checkOTPStatusSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerificationStatus));
    next = generator.next(null);
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should request check otp status', () => {
    const generator = checkOTPStatusSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerificationStatus));
    next = generator.next([]);
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should do nothing if otp status allowed to verify', () => {
    const generator = checkOTPStatusSaga();
    const successRes = [
      {
        type: 'FirstLoginOTPVerification',
        allowedToVerify: true,
      },
    ];
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerificationStatus));
    next = generator.next(successRes);
    expect(next.value).toEqual(
      put(
        updateOTPStatus({
          type: 'FirstLoginOTPVerification',
          allowedToVerify: true,
        }),
      ),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should redirect if otp status is not allowed to verify', () => {
    const generator = checkOTPStatusSaga();
    const successRes = [
      {
        type: 'FirstLoginOTPVerification',
        allowedToVerify: false,
      },
    ];
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerificationStatus));
    next = generator.next(successRes);
    expect(next.value).toEqual(call(navigateTo, '/account-activation/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should redirect to error page if request check otp status error', () => {
    const generator = checkOTPStatusSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerificationStatus));
    next = generator.next({ error: true });
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should request verify otp', () => {
    window.location.replace = jest.fn();

    const generator = verify({
      payload: { otpCode: '123456' },
    });
    const successRes = {};
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerification, '123456'));
    next = generator.next(successRes);
    expect(window.location.replace).toHaveBeenCalledWith('/renew-token');
  });

  it('should redirect to error page when request verify otp failed maxium count', () => {
    const generator = verify({
      payload: { otpCode: '123456' },
    });
    const failedRes = {
      error: true,
      messageKey: 'ReachedMaxFailedVerificationAttempts',
    };
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerification, '123456'));
    next = generator.next(failedRes);
    expect(next.value).toEqual(call(navigateTo, '/account-activation/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should show error when request verify otp failed', () => {
    const generator = verify({
      payload: { otpCode: '123456' },
    });
    const failedRes = {
      error: true,
      messageKey: 'InvalidOTP',
      message: 'Invalid OTP',
    };
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(requestOTPVerification, '123456'));
    next = generator.next(failedRes);
    expect(next.value).toEqual(
      put(stopSubmit('account-activation', { otp: 'Invalid OTP' })),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });
});
