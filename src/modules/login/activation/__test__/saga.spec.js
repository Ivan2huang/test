import { all, call, put, takeLeading } from 'redux-saga/effects';

import validateActivationSaga, { validateActivation } from '../saga';
import { updateValidationStatus } from '../action';
import { validateActivation as validateActivationApi } from '../api';
import { UNKNOWN_ERROR } from '../constant';

jest.mock('../api', () => ({
  validateActivation: jest.fn(),
}));

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    activationSuccess: '/activationSuccess',
    activationLinkExpired: '/activationLinkExpired',
    error: '/error',
  },
}));

jest.mock('../../../../helpers/logger');

describe('validateActivation Saga', () => {
  it('should watch actions', () => {
    const generator = validateActivationSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([takeLeading('VALIDATE_ACTIVATION', validateActivation)]),
    );
  });

  it('should handle success scenario for validate activation', () => {
    const client = 'dummy@test.com';
    const token = '123';
    const action = {
      type: 'VALIDATE_ACTIVATION',
      payload: {
        client,
        token,
      },
    };
    const successRes = {};
    const generator = validateActivation(action);
    let next = generator.next();
    expect(next.value).toEqual(call(validateActivationApi, client, token));
    next = generator.next(successRes);
    expect(next.value).toEqual(
      put(updateValidationStatus('VERIFICATION_SUCCESS')),
    );
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle failure scenario for validate activation', () => {
    const client = 'dummy@test.com';
    const token = '123';
    const action = {
      type: 'VALIDATE_ACTIVATION',
      payload: {
        client,
        token,
      },
    };
    const failureRes = { error: true, messageKey: '123' };

    const generator = validateActivation(action);
    let next = generator.next();
    expect(next.value).toEqual(call(validateActivationApi, client, token));
    next = generator.next(failureRes);
    expect(next.value).toEqual(
      put(updateValidationStatus(failureRes.messageKey)),
    );
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should thrown unknown error whet try block fail', () => {
    const action = undefined;

    const generator = validateActivation(action);
    let next = generator.next();
    expect(next.value).toEqual(put(updateValidationStatus(UNKNOWN_ERROR)));
    next = generator.next();
    expect(next.done).toBe(true);
  });
});
