import { updateApprovedRejectedClaims, updatePendingClaims } from '../action';

describe('Make Claim Action', () => {
  it('should create update pending claims', () => {
    const expected = {
      type: 'UPDATE_PENDING_CLAIMS',
      payload: {
        pendingClaims: [
          { status: 'Pending', patientName: 'Joe' },
          { status: 'Pending', patientName: 'Jacob' },
        ],
      },
    };

    const actual = updatePendingClaims([
      { status: 'Pending', patientName: 'Joe' },
      { status: 'Pending', patientName: 'Jacob' },
    ]);

    expect(actual).toEqual(expected);
  });

  it('should create update approved rejected claims action', () => {
    const expected = {
      type: 'UPDATE_APPROVED_REJECTED_CLAIMS',
      payload: {
        approvedRejectedClaims: [
          { status: 'Approved', patientName: 'Joe' },
          { status: 'Rejected', patientName: 'Jacob' },
        ],
      },
    };

    const actual = updateApprovedRejectedClaims([
      { status: 'Approved', patientName: 'Joe' },
      { status: 'Rejected', patientName: 'Jacob' },
    ]);

    expect(actual).toEqual(expected);
  });
});
