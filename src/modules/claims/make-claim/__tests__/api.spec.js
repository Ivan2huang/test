import {
  getClaimTypes,
  getWalletBalance,
  submitClaim,
  uploadDocument,
} from '../api';
import claimTypesTestData from './data/claimTypesTestData.json';
import walletBalanceTestData from './data/walletBalanceTestData.json';
import { fetchData, uploadFile } from '../../../../helpers/fetch';

jest.mock('../helper', () => ({
  transformConsultationDate: jest.fn(() => '2019-04-01T00:00:00+08:00'),
}));

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
  uploadFile: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  submitClaim: 'test/submitClaim',
  claimTypes: 'test/getClaimTypes',
  uploadDocument: type => `test/api/${type}/digitalcontent`,
  walletBalance: `test/api/2019/wallet`,
}));

describe('Claim Api', () => {
  it('should get the claim types', async () => {
    fetchData.mockReturnValue(claimTypesTestData);
    const expected = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
            claimCategory: 'Outpatient',
            isInsuranceClaim: true,
            displayOrder: 1,
            claimTypeIds: [10],
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
            maxAmountPerClaim: 800.0,
            referralRequired: false,
            claimType: 'General practitioner',
            claimCategoryId: 1,
            claimReasonIds: [100],
            isInsuranceClaim: true,
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
            claimReason: 'Abdominal Colic',
          },
        },
      },
    };

    const actual = await getClaimTypes();

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/getClaimTypes');
  });

  it('should return empty claim types if they are inactive', async () => {
    claimTypesTestData[0].claimTypes[0].isActive = false;
    fetchData.mockReturnValue(claimTypesTestData);
    const expected = {
      categories: {
        all: [],
        byId: {},
      },
      types: {
        byId: {},
      },
      reasons: {
        byId: {},
      },
    };

    const actual = await getClaimTypes();

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith('get', 'test/getClaimTypes');
  });

  it('should submit claim successfully', async () => {
    const submitClaimResponse = {
      claimObjectId: 461,
      message: '#CLAIM_SUBMIT_SUCCESS#',
      id: 'C-GP5-461',
    };
    const formValues = {
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 10,
        diagnosis: 100,
        consultationDate: '2019-03-31T16:00:00.000Z',
        receiptAmount: '1234',
        otherInsurerAmount: '123',
        anotherInsurer: false,
      },
      receiptFileIds: [123],
      referralFileIds: [1234],
    };
    const claimType = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
            claimCategoryId: 1,
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
          },
        },
      },
    };
    const claimData = {
      claimantId: '12',
      categoryCode: 'outpatient',
      reasonCode: 'COLIC',
      typeCode: 'MO-GP',
      amount: '1234',
      acceptTermsAndConditions: true,
      contactNumber: '12345678',
      receiptDate: '2019-04-01T00:00:00+08:00',
      documents: {
        receipts: [123],
        referrals: [1234],
      },
    };

    fetchData.mockReturnValue(submitClaimResponse);

    const actual = await submitClaim(formValues, claimType);

    expect(actual).toEqual(submitClaimResponse);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/submitClaim',
      claimData,
    );
  });

  it('should submit claim successfully with other insurer amount', async () => {
    const submitClaimResponse = {
      claimObjectId: 461,
      message: '#CLAIM_SUBMIT_SUCCESS#',
      id: 'C-GP5-461',
    };
    const formValues = {
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 10,
        diagnosis: 100,
        consultationDate: '2019-03-31T16:00:00.000Z',
        receiptAmount: '1234',
        otherInsurerAmount: 123,
        anotherInsurer: true,
      },
      receiptFileIds: [123],
      referralFileIds: [1234],
    };
    const claimType = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
            claimCategoryId: 1,
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
          },
        },
      },
    };
    const claimData = {
      claimantId: '12',
      categoryCode: 'outpatient',
      reasonCode: 'COLIC',
      typeCode: 'MO-GP',
      amount: '1234',
      acceptTermsAndConditions: true,
      contactNumber: '12345678',
      receiptDate: '2019-04-01T00:00:00+08:00',
      otherInsurerAmount: 123,
      documents: {
        receipts: [123],
        referrals: [1234],
      },
    };

    fetchData.mockReturnValue(submitClaimResponse);

    const actual = await submitClaim(formValues, claimType);

    expect(actual).toEqual(submitClaimResponse);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/submitClaim',
      claimData,
    );
  });

  it('should submit claim successfully with diagnosis text', async () => {
    const submitClaimResponse = {
      claimObjectId: 461,
      message: '#CLAIM_SUBMIT_SUCCESS#',
      id: 'C-GP5-461',
    };
    const formValues = {
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 10,
        diagnosis: 100,
        consultationDate: '2019-03-31T16:00:00.000Z',
        receiptAmount: '1234',
        otherInsurerAmount: 123,
        anotherInsurer: true,
        diagnosisText: 'test',
      },
      receiptFileIds: [123],
      referralFileIds: [1234],
    };
    const claimType = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
            claimCategoryId: 1,
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
          },
        },
      },
    };
    const claimData = {
      claimantId: '12',
      categoryCode: 'outpatient',
      reasonCode: 'COLIC',
      typeCode: 'MO-GP',
      amount: '1234',
      acceptTermsAndConditions: true,
      contactNumber: '12345678',
      receiptDate: '2019-04-01T00:00:00+08:00',
      otherInsurerAmount: 123,
      documents: {
        receipts: [123],
        referrals: [1234],
      },
    };

    fetchData.mockReturnValue(submitClaimResponse);

    const actual = await submitClaim(formValues, claimType);

    expect(actual).toEqual(submitClaimResponse);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/submitClaim',
      claimData,
    );
  });

  it('should return error when submit claim api fails', async () => {
    const claimData = {
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 10,
        diagnosis: 100,
        consultationDate: '2019-03-31T16:00:00.000Z',
        receiptAmount: '1234',
        otherInsurerAmount: '123',
      },
    };
    const claimType = {
      categories: {
        all: [1],
        byId: {
          1: {
            id: 1,
            code: 'outpatient',
          },
        },
      },
      types: {
        byId: {
          10: {
            id: 10,
            code: 'MO-GP',
            claimCategoryId: 1,
          },
        },
      },
      reasons: {
        byId: {
          100: {
            id: 100,
            code: 'COLIC',
          },
        },
      },
    };
    const expected = { error: 'api call failure' };

    fetchData.mockReturnValue(undefined);

    const actual = await submitClaim(claimData, claimType);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/submitClaim',
      expect.anything(),
    );
  });

  it('should return File Reference number', async () => {
    uploadFile.mockReturnValue({
      documentId: 1711,
    });

    const expected = 1711;

    const actual = await uploadDocument('receipts', { name: 'test.pdf' });

    expect(actual).toEqual(expected);
  });

  it('should return Error when upload file api fail', async () => {
    uploadFile.mockReturnValue(undefined);

    const expected = 'Error';

    const actual = await uploadDocument('receipts', { name: 'test.pdf' });

    expect(actual).toEqual(expected);
  });

  it('should call uploadFile with parameter', async () => {
    const file = { name: 'test.pdf' };
    await uploadDocument('receipts', file);
    const fileFormData = new FormData();
    fileFormData.append('document', file);
    expect(uploadFile).toHaveBeenCalledWith(
      'post',
      'test/api/receipts/digitalcontent',
      fileFormData,
    );
  });

  it('should get the wallet balance with valid access token', async () => {
    fetchData.mockReturnValue(walletBalanceTestData);
    const expected = {
      memberToWalletBalanceMap: {
        '3': 1000,
        '27': 2000,
      },
      memberToWalletBalanceTextMap: {
        '3': 'HK$1000',
        '27': 'HK$2000',
      },
    };

    const actual = await getWalletBalance(2019);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/api/2019/wallet',
      null,
      true,
    );
  });

  it('should get the wallet balance with no member information and valid access token', async () => {
    fetchData.mockReturnValue({
      ...walletBalanceTestData,
      member: undefined,
    });
    const expected = {
      memberToWalletBalanceMap: {
        '27': 2000,
      },
      memberToWalletBalanceTextMap: {
        '27': 'HK$2000',
      },
    };

    const actual = await getWalletBalance(2019);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/api/2019/wallet',
      null,
      true,
    );
  });

  it('should get the wallet balance with no dependent information and valid access token', async () => {
    fetchData.mockReturnValue({
      ...walletBalanceTestData,
      dependents: undefined,
    });
    const expected = {
      memberToWalletBalanceMap: {
        '3': 1000,
      },
      memberToWalletBalanceTextMap: {
        '3': 'HK$1000',
      },
    };

    const actual = await getWalletBalance(2019);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/api/2019/wallet',
      null,
      true,
    );
  });

  it('should get the error when api fail to fetch the wallet balance with valid access token', async () => {
    fetchData.mockReturnValue({ error: true });
    const expected = {
      error: true,
    };
    const actual = await getWalletBalance(2019);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/api/2019/wallet',
      null,
      true,
    );
  });

  it('should get the wallet balance for dependents even when there is no wallet balance for the member', async () => {
    walletBalanceTestData.member = null;
    fetchData.mockReturnValue(walletBalanceTestData);
    const expected = {
      memberToWalletBalanceMap: {
        '27': 2000,
      },
      memberToWalletBalanceTextMap: {
        '27': 'HK$2000',
      },
    };

    const actual = await getWalletBalance(2019);

    expect(actual).toEqual(expected);
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/api/2019/wallet',
      null,
      true,
    );
  });
});
