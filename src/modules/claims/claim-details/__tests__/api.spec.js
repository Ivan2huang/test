import NEW_CLAIM_DETAIL from './data/newClaimDetailTestData.json';
import getNewClaimDetails from '../api';
import { fetchData } from '../../../../helpers/fetch';
import { formatDate } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  formatDate: jest.fn(date => date),
}));

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  claimDetails: () => '/claims/12',
  claimDocument: jest.fn(id => id),
}));

jest.mock('../../../../constants/config', () => ({
  dateFormat: 'd MMM yyyy',
}));

jest.mock('../helper', () => ({
  getFileUrl: jest.fn((fileName, fileUrl) => `blob$://${fileUrl}`),
}));

describe('Claim Details Api', () => {
  it('should get claim details', async () => {
    fetchData.mockReturnValue(NEW_CLAIM_DETAIL);
    const expected = {
      status: 'Pending',
      statusCode: 'PENDING',
      claimSubmissionDate: formatDate('2019-09-11T04:34:18.065384'),
      claimantId: '3',
      contactNumber: '123456',
      claimItemCategoryCode: 'outpatient',
      consultationType: 'General practitioner',
      diagnosis: 'Abdominal Colic',
      consultationDate: formatDate('2019-09-11T04:31:26'),
      receiptAmount: 1,
      reimbursedAmount: 0,
      settlementDate: formatDate('2019-09-11T05:00:31.68479'),
      claimAmountOtherInsurer: 0,
      receipts: [
        {
          contentType: 'application/pdf',
          url: 'blob$://26332ece-f811-4126-9c36-60d26a6d328c',
        },
      ],
      referrals: [
        {
          contentType: 'image/jpeg',
          url: 'blob$://26332ece-f811-4126-9c36-60d26a6d328c',
        },
      ],
    };
    const actual = await getNewClaimDetails(
      '9a3f99e3-7062-4fa7-9a5a-108f60fe4192',
    );

    expect(actual).toEqual(expected);
  });

  it('should get claim details when no attachments available', async () => {
    fetchData.mockReturnValue({ ...NEW_CLAIM_DETAIL, documents: [] });
    const expected = {
      status: 'Pending',
      statusCode: 'PENDING',
      claimSubmissionDate: formatDate('2019-09-11T04:34:18.065384'),
      claimantId: '3',
      contactNumber: '123456',
      claimItemCategoryCode: 'outpatient',
      consultationType: 'General practitioner',
      diagnosis: 'Abdominal Colic',
      consultationDate: formatDate('2019-09-11T04:31:26'),
      receiptAmount: 1,
      reimbursedAmount: 0,
      settlementDate: formatDate('2019-09-11T05:00:31.68479'),
      claimAmountOtherInsurer: 0,
      receipts: [],
      referrals: [],
    };
    const actual = await getNewClaimDetails(
      '9a3f99e3-7062-4fa7-9a5a-108f60fe4192',
    );

    expect(actual).toEqual(expected);
  });

  it('should return claim details undefined during error scenario', async () => {
    fetchData.mockReturnValue(undefined);
    const expected = undefined;
    const actual = await getNewClaimDetails(123);

    expect(actual).toEqual(expected);
  });
});
