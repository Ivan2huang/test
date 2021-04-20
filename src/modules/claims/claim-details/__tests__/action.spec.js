import { getNewClaimDetails, updateNewClaimDetails } from '../action';

describe('Get Claim details action', () => {
  it('should create get claim action', () => {
    const expected = {
      type: 'GET_CLAIM_DETAILS',
      payload: {
        id: 12,
      },
    };

    const actual = getNewClaimDetails(12);

    expect(actual).toEqual(expected);
  });

  it('should create update claim details action', () => {
    const claimDetails = {
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
    const expected = {
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

    const actual = updateNewClaimDetails(claimDetails);

    expect(actual).toEqual(expected);
  });
});
