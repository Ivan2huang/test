import { all, call, put, takeLatest } from 'redux-saga/effects';

import claimSaga, { getClaimsSaga, filterClaimsSaga } from '../saga';
import {
  GET_CLAIMS,
  updateApprovedRejectedClaims,
  updatePendingClaims,
  updateAppliedFilters,
  FILTER_CLAIMS,
} from '../action';
import { getClaims, filterClaims } from '../api';

jest.mock('../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../api', () => ({
  getClaims: jest.fn(),
  filterClaims: jest.fn(),
}));

describe('Claim Saga', () => {
  it('should watch actions', () => {
    const generator = claimSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLatest(GET_CLAIMS, getClaimsSaga),
        takeLatest(FILTER_CLAIMS, filterClaimsSaga),
      ]),
    );
  });

  it('should handle get claims with all success scenarios', () => {
    const pendingClaims = [
      {
        status: 'Pending Verification',
        patientName: 'William Brown',
      },
    ];
    const approveRejectedClaims = [
      {
        status: 'Approved',
        patientName: 'William Brown',
      },
      {
        status: 'Rejected',
        patientName: 'William Brown',
      },
    ];
    const generator = getClaimsSaga();
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(call(getClaims));

    next = generator.next([pendingClaims, approveRejectedClaims]);

    expect(next.value).toEqual(
      all([
        put(updatePendingClaims(pendingClaims)),
        put(updateApprovedRejectedClaims(approveRejectedClaims)),
      ]),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
  });

  describe('Filter claims', () => {
    it('should handle filter claims with all success scenarios', () => {
      const pendingClaims = [
        {
          status: 'Pending Verification',
          patientName: 'William Brown',
        },
      ];
      const approveRejectedClaims = [
        {
          status: 'Approved',
          patientName: 'William Brown',
        },
        {
          status: 'Rejected',
          patientName: 'William Brown',
        },
      ];
      const filters = {
        statuses: {
          APPROVED: true,
          REJECTED: true,
        },
      };
      const action = {
        payload: {
          filters,
        },
      };
      const generator = filterClaimsSaga(action);
      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        call(filterClaims, {
          statuses: 'APPROVED,REJECTED',
        }),
      );

      next = generator.next([pendingClaims, approveRejectedClaims]);

      expect(next.value).toEqual(
        all([
          put(updatePendingClaims(pendingClaims)),
          put(updateApprovedRejectedClaims(approveRejectedClaims)),
          put(updateAppliedFilters(filters)),
        ]),
      );

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });

    it('should pick truthy value for filtering', () => {
      const pendingClaims = [
        {
          status: 'Pending Verification',
          patientName: 'William Brown',
        },
      ];
      const approveRejectedClaims = [
        {
          status: 'Approved',
          patientName: 'William Brown',
        },
        {
          status: 'Rejected',
          patientName: 'William Brown',
        },
      ];
      const filters = {
        statuses: {
          APPROVED: true,
          REJECTED: false,
        },
      };
      const action = {
        payload: {
          filters,
        },
      };
      const generator = filterClaimsSaga(action);
      let next = generator.next();
      expect(next.value).toStrictEqual(['START_LOADER', 'page']);

      next = generator.next();
      expect(next.value).toEqual(
        call(filterClaims, {
          statuses: 'APPROVED',
        }),
      );

      next = generator.next([pendingClaims, approveRejectedClaims]);

      expect(next.value).toEqual(
        all([
          put(updatePendingClaims(pendingClaims)),
          put(updateApprovedRejectedClaims(approveRejectedClaims)),
          put(updateAppliedFilters(filters)),
        ]),
      );

      next = generator.next();
      expect(next.value).toBe('STOP_LOADER');

      next = generator.next();
      expect(next.value).toBeUndefined();
      expect(next.done).toBeTruthy();
    });
  });
});
