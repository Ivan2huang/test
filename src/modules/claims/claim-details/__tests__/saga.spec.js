import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_CLAIM_DETAILS,
  updateNewClaimDetails,
  clearClaimDetails,
} from '../action';
import claimDetails, { getClaimDetailsSaga } from '../saga';
import getClaimDetails from '../api';

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

jest.mock('../action', () => ({
  updateNewClaimDetails: jest.fn(() => 'UPDATE_CLAIM_DETAILS'),
  clearClaimDetails: jest.fn(() => 'CLEAR_CLAIM_DETAILS'),
  GET_CLAIM_DETAILS: 'GET_CLAIM_DETAILS',
}));

jest.mock('../api', () => jest.fn());

jest.mock('../../api', () => jest.fn());

describe('Claim Details saga', () => {
  it('should watch actions', () => {
    const generator = claimDetails();
    const next = generator.next();

    expect(next.value).toEqual(
      takeLatest(GET_CLAIM_DETAILS, getClaimDetailsSaga),
    );
  });

  it('should get claim details and update store', () => {
    const response = {
      status: 'Pending',
      patientName: 'William',
    };
    getClaimDetails.mockReturnValue(response);
    const action = {
      type: GET_CLAIM_DETAILS,
      payload: {
        id: 12,
        claims: [
          {
            claimantId: '11',
          },
        ],
      },
    };
    const generator = getClaimDetailsSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(put(clearClaimDetails()));

    next = generator.next();
    expect(next.value).toEqual(call(getClaimDetails, 12));

    next = generator.next(response);
    expect(next.value).toEqual(put(updateNewClaimDetails(response)));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });

  it('should get claim details from claims history and update store', () => {
    const response = {
      status: 'Pending',
      patientName: 'William',
    };
    getClaimDetails.mockReturnValue(response);
    const action = {
      type: GET_CLAIM_DETAILS,
      payload: {
        id: 12,
        claims: [
          {
            id: 12,
            status: 'Approved',
            statusCode: 'APPROVED',
            consultationDate: '2019-09-11T04:34:18.065384',
            consultationTypes: 'General practitioner',
            patientId: '3',
            claimedAmount: 1,
            approvedAmount: 0,
            originalClaim: {
              claimId: '12',
              clientId: 'cxadevclient1',
              memberId: '3',
              claimantId: '3',
              receiptDate: '2019-09-11T04:34:18.065384',
              amount: 1.0,
              reason: 'Abdominal Colic',
              reasonCode: 'COLIC',
              type: 'General practitioner',
              typeCode: 'MO-GP',
              category: 'Outpatient',
              categoryCode: 'outpatient',
              status: 'Approved',
              statusCode: 'APPROVED',
              approvedAmount: 0.0,
              acceptTermsAndConditions: true,
              contactNumber: '123456',
              otherInsurerAmount: 0.0,
              documents: {
                referrals: [],
                receipts: [
                  {
                    id: '1',
                    contentType: 'application/pdf',
                  },
                ],
              },
            },
          },
        ],
      },
    };
    const generator = getClaimDetailsSaga(action);
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next({});
    expect(next.value).toEqual(put(clearClaimDetails()));

    next = generator.next();
    expect(next.value).toEqual(call(getClaimDetails, 12));

    next = generator.next(response);
    expect(next.value).toEqual(put(updateNewClaimDetails(response)));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });
});
