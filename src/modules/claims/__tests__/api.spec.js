import { getClaims, sortBasedOnCreationDate, filterClaims } from '../api';

import claims from './data/pendingClaimsTestData.json';
import { fetchData } from '../../../helpers/fetch';

jest.mock('../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../helpers/url', () => ({
  claims: () => 'test/client/2/claims',
  filterClaims: jest.fn(p => p),
}));

describe('Claim Api', () => {
  it('should get all Classified claims by status code', async () => {
    fetchData.mockReturnValue(claims);

    const expectedPendingClaims = [
      {
        id: '2',
        status: 'Processing',
        statusCode: 'PROCESSING',
        consultationDate: '2019-09-11T04:37:06.974876',
        consultationTypes: 'Clinical',
        patientId: '3',
        claimedAmount: 100,
        approvedAmount: 0,
        originalClaim: claims[1],
      },
      {
        id: '6',
        status: 'REQUEST FOR INFORMATION',
        statusCode: 'REQUEST FOR INFORMATION',
        consultationDate: '2019-09-11T04:34:18.065384',
        consultationTypes: 'Clinical',
        patientId: '3',
        claimedAmount: 1.0,
        approvedAmount: 0,
        originalClaim: claims[5],
      },
      {
        id: '3',
        status: 'Processing',
        statusCode: 'PROCESSING',
        consultationDate: '2019-09-05T08:18:01.982703',
        consultationTypes: 'Hospital',
        patientId: '3',
        claimedAmount: 222,
        approvedAmount: 0,
        originalClaim: claims[2],
      },
    ];
    const expectedApprovedAndRejectedClaims = [
      {
        id: '1',
        status: 'Approved',
        statusCode: 'APPROVED',
        consultationDate: '2019-09-11T04:34:18.065384',
        consultationTypes: 'Clinical',
        patientId: '3',
        claimedAmount: 1,
        approvedAmount: 0,
        originalClaim: claims[0],
      },
      {
        id: '5',
        status: 'Rejected',
        statusCode: 'REJECTED',
        consultationDate: '2019-09-11T04:34:18.065384',
        consultationTypes: 'Clinical',
        patientId: '3',
        claimedAmount: 1,
        approvedAmount: 0,
        originalClaim: claims[4],
      },
    ];

    const actual = await getClaims();

    expect(actual[0]).toEqual(expectedPendingClaims);
    expect(actual[1]).toEqual(expectedApprovedAndRejectedClaims);
  });

  it('should get empty claims when no claim is present', async () => {
    fetchData.mockReturnValue([]);

    const expected = [[], []];

    const actual = await getClaims();

    expect(actual).toEqual(expected);
  });

  it('should return empty pending claims if there is no response', async () => {
    fetchData.mockReturnValue(undefined);

    const expected = [[], []];

    const actual = await getClaims();

    expect(actual).toEqual(expected);
  });

  it('should sort claims on the basis of consultation date', () => {
    const unsortedClaims = [
      {
        status: 'Approved',
        consultationDate: '2019-04-27T05:52:25.173Z',
        consultationTypes: 'Hospital',
        patientName: 'Brown',
        claimedAmount: 600,
        approveAmount: 600,
      },
      {
        status: 'Rejected',
        consultationDate: '2019-04-29T05:52:25.173Z',
        consultationTypes: 'Clinical',
        patientName: 'William Brown',
        claimedAmount: 500,
        approveAmount: 400,
      },
    ];

    const expected = [
      {
        status: 'Rejected',
        consultationDate: '2019-04-29T05:52:25.173Z',
        consultationTypes: 'Clinical',
        patientName: 'William Brown',
        claimedAmount: 500,
        approveAmount: 400,
      },
      {
        status: 'Approved',
        consultationDate: '2019-04-27T05:52:25.173Z',
        consultationTypes: 'Hospital',
        patientName: 'Brown',
        claimedAmount: 600,
        approveAmount: 600,
      },
    ];

    const actual = sortBasedOnCreationDate(unsortedClaims);

    expect(actual).toEqual(expected);
  });

  describe('Filter claims', () => {
    it('should get all Classified claims by filter values', async () => {
      fetchData.mockReturnValue(claims);

      const expectedPendingClaims = [
        {
          id: '2',
          status: 'Processing',
          statusCode: 'PROCESSING',
          consultationDate: '2019-09-11T04:37:06.974876',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 100,
          approvedAmount: 0,
          originalClaim: claims[1],
        },
        {
          id: '6',
          status: 'REQUEST FOR INFORMATION',
          statusCode: 'REQUEST FOR INFORMATION',
          consultationDate: '2019-09-11T04:34:18.065384',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 1.0,
          approvedAmount: 0,
          originalClaim: claims[5],
        },
        {
          id: '3',
          status: 'Processing',
          statusCode: 'PROCESSING',
          consultationDate: '2019-09-05T08:18:01.982703',
          consultationTypes: 'Hospital',
          patientId: '3',
          claimedAmount: 222,
          approvedAmount: 0,
          originalClaim: claims[2],
        },
      ];
      const expectedApprovedAndRejectedClaims = [
        {
          id: '1',
          status: 'Approved',
          statusCode: 'APPROVED',
          consultationDate: '2019-09-11T04:34:18.065384',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 1,
          approvedAmount: 0,
          originalClaim: claims[0],
        },
        {
          id: '5',
          status: 'Rejected',
          statusCode: 'REJECTED',
          consultationDate: '2019-09-11T04:34:18.065384',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 1,
          approvedAmount: 0,
          originalClaim: claims[4],
        },
      ];

      const actual = await filterClaims({ statuses: 'APPROVED' });

      expect(actual[0]).toEqual(expectedPendingClaims);
      expect(actual[1]).toEqual(expectedApprovedAndRejectedClaims);
    });

    it('should get all Classified claims if the filter values are empty', async () => {
      fetchData.mockReturnValue(claims);

      const expectedPendingClaims = [
        {
          id: '2',
          status: 'Processing',
          statusCode: 'PROCESSING',
          consultationDate: '2019-09-11T04:37:06.974876',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 100,
          approvedAmount: 0,
          originalClaim: claims[1],
        },
        {
          id: '6',
          status: 'REQUEST FOR INFORMATION',
          statusCode: 'REQUEST FOR INFORMATION',
          consultationDate: '2019-09-11T04:34:18.065384',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 1.0,
          approvedAmount: 0,
          originalClaim: claims[5],
        },
        {
          id: '3',
          status: 'Processing',
          statusCode: 'PROCESSING',
          consultationDate: '2019-09-05T08:18:01.982703',
          consultationTypes: 'Hospital',
          patientId: '3',
          claimedAmount: 222,
          approvedAmount: 0,
          originalClaim: claims[2],
        },
      ];
      const expectedApprovedAndRejectedClaims = [
        {
          id: '1',
          status: 'Approved',
          statusCode: 'APPROVED',
          consultationDate: '2019-09-11T04:34:18.065384',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 1,
          approvedAmount: 0,
          originalClaim: claims[0],
        },
        {
          id: '5',
          status: 'Rejected',
          statusCode: 'REJECTED',
          consultationDate: '2019-09-11T04:34:18.065384',
          consultationTypes: 'Clinical',
          patientId: '3',
          claimedAmount: 1,
          approvedAmount: 0,
          originalClaim: claims[4],
        },
      ];

      const actual = await filterClaims({});

      expect(actual[0]).toEqual(expectedPendingClaims);
      expect(actual[1]).toEqual(expectedApprovedAndRejectedClaims);
    });

    it('should get empty claims when no claim is present', async () => {
      fetchData.mockReturnValue(undefined);

      const expected = [[], []];

      const actual = await filterClaims({});

      expect(actual).toEqual(expected);
    });
  });
});
