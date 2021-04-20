import reducer from '../reducer';

describe('Claim Details reducer', () => {
  it('should update store with claim details', () => {
    const initialState = {};
    const action = {
      type: 'UPDATE_CLAIM_DETAILS',
      payload: {
        claimDetails: {
          status: 'Pending Verification',
          claimNumber: 'C-GP2-7',
          claimSubmissionDate: '2019-08-01T10:00:40.797Z',
          patientName: 'William Brown',
          contactNumber: '81924434',
          consultationType: 'General Medical Practitioner',
          diagnosis: 'Abscess',
          consultationDate: '2019-04-17T16:00:00Z',
          receipts: [],
        },
      },
    };
    const expected = {
      status: 'Pending Verification',
      claimNumber: 'C-GP2-7',
      claimSubmissionDate: '2019-08-01T10:00:40.797Z',
      patientName: 'William Brown',
      contactNumber: '81924434',
      consultationType: 'General Medical Practitioner',
      diagnosis: 'Abscess',
      consultationDate: '2019-04-17T16:00:00Z',
      receipts: [],
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should clear claim details', () => {
    const initialState = {
      status: 'Pending Verification',
      claimNumber: 'C-GP2-7',
      claimSubmissionDate: '2019-08-01T10:00:40.797Z',
      patientName: 'William Brown',
      contactNumber: '81924434',
      consultationType: 'General Medical Practitioner',
      diagnosis: 'Abscess',
      consultationDate: '2019-04-17T16:00:00Z',
      receipts: [],
    };
    const action = {
      type: 'CLEAR_CLAIM_DETAILS',
      payload: {},
    };
    const expected = {};

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
