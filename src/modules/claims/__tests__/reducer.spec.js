import reducer from '../reducer';
import { UPDATE_APPLIED_FILTERS } from '../action';

describe('Claim reducer', () => {
  it('should update the pending claims', () => {
    const initialState = {
      pendingClaims: [],
    };
    const action = {
      type: 'UPDATE_PENDING_CLAIMS',
      payload: {
        pendingClaims: [
          {
            status: 'Pending',
          },
        ],
      },
    };
    const expected = {
      pendingClaims: [
        {
          status: 'Pending',
        },
      ],
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update approved and rejected  claims', () => {
    const initialState = {
      approvedRejectedClaims: [],
    };
    const action = {
      type: 'UPDATE_APPROVED_REJECTED_CLAIMS',
      payload: {
        approvedRejectedClaims: [
          {
            status: 'Approved',
          },
          {
            status: 'Rejected',
          },
        ],
      },
    };
    const expected = {
      approvedRejectedClaims: [
        {
          status: 'Approved',
        },
        {
          status: 'Rejected',
        },
      ],
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });

  it('should update applied filter values', () => {
    const initialState = {
      appliedFilters: {},
    };
    const action = {
      type: UPDATE_APPLIED_FILTERS,
      payload: {
        appliedFilters: {
          statuses: {
            APPROVED: true,
          },
        },
      },
    };
    const expected = {
      appliedFilters: {
        statuses: {
          APPROVED: true,
        },
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });
});
