import { call, put, takeLeading } from 'redux-saga/effects';
import { reset } from 'redux-form';

import { navigateTo } from '../../../../../helpers/helpers';
import { updateError } from '../../../../error/action';
import inviteDependentSaga, { getInviteDependentSaga } from '../saga';

import { INVITE_DEPENDENT } from '../action';
import { inviteDependent, updateDependentProfile } from '../api';
import paths from '../../../../../helpers/paths';
import ERROR from '../../../../../constants/error';

jest.mock('../../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../api', () => ({
  inviteDependent: jest.fn(),
  updateDependentProfile: jest.fn(),
}));

jest.mock('../../../../loader', () => ({
  *loader(task, id, message) {
    yield ['START_LOADER', id, message];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

describe('Invite dependent Saga', () => {
  it('should watch actions', () => {
    const generator = inviteDependentSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      takeLeading(INVITE_DEPENDENT, getInviteDependentSaga),
    );
  });

  it('should handle the success dependent invitation', () => {
    const action = {
      type: INVITE_DEPENDENT,
      payload: {
        dependentData: {
          dependentEmail: 'a@a.com',
          dependentId: '12',
          dependentName: 'test',
          hasDefaultDateOfBirth: true,
          dateOfBirth: null,
        },
        loaderMessage: 'loading...',
      },
    };

    const generator = getInviteDependentSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.inviteDependent.emailAlreadyTaken, false)),
    );
    next = generator.next();
    expect(next.value).toEqual(call(inviteDependent, 'a@a.com', '12'));
    next = generator.next('');
    expect(next.value).toEqual(
      call(navigateTo, paths.employee.inviteDependentSuccess, {
        dependentEmail: 'a@a.com',
        dependentName: 'test',
      }),
    );
    next = generator.next();
    expect(next.value).toEqual(put(reset('inviteDependent')));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle submit dependent invitation general error scenario', () => {
    const action = {
      type: INVITE_DEPENDENT,
      payload: {
        dependentData: {
          dependentEmail: 'a@a.com',
          dependentId: '12',
          dependentName: 'test',
          hasDefaultDateOfBirth: true,
          dateOfBirth: null,
        },
        loaderMessage: 'loading...',
      },
    };

    const payload = {
      error: true,
      messageKey: 'AnyError',
      message: 'Any Error',
    };

    const generator = getInviteDependentSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.inviteDependent.emailAlreadyTaken, false)),
    );
    next = generator.next();
    expect(next.value).toEqual(call(inviteDependent, 'a@a.com', '12'));
    next = generator.next(payload);
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('should handle submit dependent invitation email already taken error scenario', () => {
    const action = {
      type: INVITE_DEPENDENT,
      payload: {
        dependentData: {
          dependentEmail: 'a@a.com',
          dependentId: '12',
          dependentName: 'test',
          hasDefaultDateOfBirth: true,
          dateOfBirth: null,
        },
        loaderMessage: 'loading...',
      },
    };

    const payload = {
      error: true,
      messageKey: 'EmailAlreadyTaken',
      message: 'Email Already Taken',
    };

    const generator = getInviteDependentSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.inviteDependent.emailAlreadyTaken, false)),
    );
    next = generator.next();
    expect(next.value).toEqual(call(inviteDependent, 'a@a.com', '12'));
    next = generator.next(payload);
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.inviteDependent.emailAlreadyTaken, true)),
    );
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toEqual(true);
  });

  it('should handle submit with update for date of birth and dependent invitation', () => {
    const dateOfBirth = new Date(2010, 1, 1);
    const action = {
      type: INVITE_DEPENDENT,
      payload: {
        dependentData: {
          dependentEmail: 'a@a.com',
          dependentId: '12',
          dependentName: 'test',
          hasDefaultDateOfBirth: false,
          dateOfBirth: new Date(2010, 1, 1),
        },
        loaderMessage: 'loading...',
      },
    };

    const generator = getInviteDependentSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.inviteDependent.emailAlreadyTaken, false)),
    );
    next = generator.next();
    expect(next.value).toEqual(call(updateDependentProfile, '12', dateOfBirth));
    next = generator.next();
    expect(next.value).toEqual(call(inviteDependent, 'a@a.com', '12'));
    next = generator.next('');
    expect(next.value).toEqual(
      call(navigateTo, paths.employee.inviteDependentSuccess, {
        dependentEmail: 'a@a.com',
        dependentName: 'test',
      }),
    );
    next = generator.next();
    expect(next.value).toEqual(put(reset('inviteDependent')));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toBe(true);
  });

  it('should handle submit with update for date of birth with error response', () => {
    const dateOfBirth = new Date(2010, 1, 1);
    const action = {
      type: INVITE_DEPENDENT,
      payload: {
        dependentData: {
          dependentEmail: 'a@a.com',
          dependentId: '12',
          dependentName: 'test',
          hasDefaultDateOfBirth: false,
          dateOfBirth: new Date(2010, 1, 1),
        },
        loaderMessage: 'loading...',
      },
    };

    const errorPayload = {
      error: true,
      messageKey: 'Any error',
      message: 'Error message',
    };

    const generator = getInviteDependentSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page', 'loading...']);
    next = generator.next();
    expect(next.value).toStrictEqual(
      put(updateError(ERROR.inviteDependent.emailAlreadyTaken, false)),
    );
    next = generator.next();
    expect(next.value).toEqual(call(updateDependentProfile, '12', dateOfBirth));
    next = generator.next(errorPayload);
    expect(next.value).toEqual(call(navigateTo, '/error'));
    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
    next = generator.next();
    expect(next.done).toBe(true);
  });
});
