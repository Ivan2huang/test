import {
  claimDetailsWithIntl,
  claimSubmissionDetails,
  getBackgroundImage,
  getIntlIdDefaultMessageForAmount,
  patientDetails,
  getFileUrl,
} from '../helper';
import { fetchFile } from '../../../../helpers/fetch';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatAmount: jest.fn((intl, amount) => amount),
  formatDate: jest.fn(date => date),
}));

jest.mock('../../../../helpers/fetch', () => ({
  fetchFile: jest.fn(),
}));

describe('Helper functions', () => {
  describe('getIntlIdDefaultMessageForAmount', () => {
    it('should return the intl id and default message for outpatient', () => {
      const expected = {
        id: 'claims.claimDetails.label.receiptAmount',
        defaultMessage: 'Receipt amount',
      };

      const actual = getIntlIdDefaultMessageForAmount('Outpatient');

      expect(actual).toEqual(expected);
    });
    it('should return the intl id and default message for other than outpatient', () => {
      const expected = {
        id: 'claims.claimDetails.label.claimAmount',
        defaultMessage: 'Claim amount',
      };

      const actual = getIntlIdDefaultMessageForAmount('Wellness');

      expect(actual).toEqual(expected);
    });
  });

  describe('getBackgroundImage', () => {
    it('should return background image for PENDING claims', () => {
      const expected = '/static/pending_claim_background.svg';

      const actual = getBackgroundImage('PROCESSING');

      expect(actual).toEqual(expected);
    });

    it('should return background image for REQUEST FOR INFORMATION claims', () => {
      const expected = '/static/pending_claim_background.svg';

      const actual = getBackgroundImage('REQUEST FOR INFORMATION');

      expect(actual).toEqual(expected);
    });

    it('should return background image for APPROVED claims', () => {
      const expected = '/static/approved_claim_background.svg';

      const actual = getBackgroundImage('APPROVED');

      expect(actual).toEqual(expected);
    });

    it('should return background image for REJECTED claims', () => {
      const expected = '/static/rejected_claim_background.svg';

      const actual = getBackgroundImage('REJECTED');

      expect(actual).toEqual(expected);
    });

    it('should return empty background image for Invalid claims', () => {
      const expected = '';

      const actual = getBackgroundImage('Invalid');

      expect(actual).toEqual(expected);
    });
  });

  describe('claimSubmissionDetails', () => {
    let details;
    beforeEach(() => {
      details = {
        claimSubmissionDate: '16 Aug 2019',
        reimbursedAmount: 5.012,
        settlementDate: '17 Aug 2019',
        statusCode: '',
      };
    });

    it('should return claim details for Pending claims', () => {
      details.statusCode = 'PENDING';
      const expected = [];

      const actual = claimSubmissionDetails(details, null);

      expect(actual).toEqual(expected);
    });
    it('should return claim details for Approved claims', () => {
      details.statusCode = 'APPROVED';
      details.claimItemCategoryCode = 'Outpatient';
      const expected = [
        {
          label: 'Total Reimbursed amount',
          value: 'HK$5.012',
        },
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      const actual = claimSubmissionDetails(details, null);

      expect(actual).toEqual(expected);
    });

    it('should return claim details without reimbursed amount when reimbursed amount equal 0', () => {
      details.statusCode = 'APPROVED';
      details.reimbursedAmount = 0;
      details.claimItemCategoryCode = 'Outpatient';
      const expected = [
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      const actual = claimSubmissionDetails(details, null);

      expect(actual).toEqual(expected);
    });

    it('should return claim details without reimbursed amount for cashless claims', () => {
      details.statusCode = 'APPROVED';
      details.isCashlessClaim = true;
      const expected = [];

      const actual = claimSubmissionDetails(details, null);

      expect(actual).toEqual(expected);
    });

    it('should return claim details for Rejected claims', () => {
      details.statusCode = 'REJECTED';
      const expected = [
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      const actual = claimSubmissionDetails(details, null);

      expect(actual).toEqual(expected);
    });

    it('should return claim details with breakdown reimbursed amount', () => {
      details.statusCode = 'APPROVED';
      details.claimItemCategoryCode = 'Wellness';
      details.paymentList = [
        {
          benefitDescEng: 'BONESETTER/HERBALIST/ACUPUNCTURE',
          benefitDescSch: '跌打 / 中醫 / 針灸',
          reimbursedCurrency: 'HKD',
          reimbursedAmount: 180,
        },
        {
          benefitDescEng: 'CHILDBIRTH',
          benefitDescSch: '產科',
          reimbursedCurrency: 'HKD',
          reimbursedAmount: 80,
        },
      ];

      const expectedEn = [
        {
          label: 'Total Reimbursed amount',
          value: 'HK$5.012',
        },
        {
          label: 'Reimbursed Item 1',
          value: 'BONESETTER/HERBALIST/ACUPUNCTURE HK$180',
        },
        {
          label: 'Reimbursed Item 2',
          value: 'CHILDBIRTH HK$80',
        },
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      const actualEn = claimSubmissionDetails(details, {
        locale: 'en-HK',
      });

      expect(actualEn).toEqual(expectedEn);

      const actualZh = claimSubmissionDetails(details, {
        locale: 'zh-HK',
      });

      const expectedZh = [
        {
          label: 'Total Reimbursed amount',
          value: 'HK$5.012',
        },
        {
          label: 'Reimbursed Item 1',
          value: '跌打 / 中醫 / 針灸 HK$180',
        },
        {
          label: 'Reimbursed Item 2',
          value: '產科 HK$80',
        },
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      expect(actualZh).toEqual(expectedZh);
    });

    it('should return claim details with breakdown negative reimbursed amount', () => {
      details.statusCode = 'APPROVED';
      details.claimItemCategoryCode = 'Wellness';
      details.paymentList = [
        {
          benefitDescEng: 'BONESETTER/HERBALIST/ACUPUNCTURE',
          benefitDescSch: '跌打 / 中醫 / 針灸',
          reimbursedCurrency: 'HKD',
          reimbursedAmount: -180,
        },
        {
          benefitDescEng: 'CHILDBIRTH',
          benefitDescSch: '產科',
          reimbursedCurrency: 'HKD',
          reimbursedAmount: 80,
        },
      ];

      const expectedEn = [
        {
          label: 'Total Reimbursed amount',
          value: 'HK$5.012',
        },
        {
          label: 'Reimbursed Item 1',
          value: 'BONESETTER/HERBALIST/ACUPUNCTURE -HK$180',
        },
        {
          label: 'Reimbursed Item 2',
          value: 'CHILDBIRTH HK$80',
        },
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      const actualEn = claimSubmissionDetails(details, {
        locale: 'en-HK',
      });

      expect(actualEn).toEqual(expectedEn);

      const actualZh = claimSubmissionDetails(details, {
        locale: 'zh-HK',
      });

      const expectedZh = [
        {
          label: 'Total Reimbursed amount',
          value: 'HK$5.012',
        },
        {
          label: 'Reimbursed Item 1',
          value: '跌打 / 中醫 / 針灸 -HK$180',
        },
        {
          label: 'Reimbursed Item 2',
          value: '產科 HK$80',
        },
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      expect(actualZh).toEqual(expectedZh);
    });

    it('should return claim details with breakdown reimbursed amount fallback to English when Chinese not provided', () => {
      details.statusCode = 'APPROVED';
      details.claimItemCategoryCode = 'Wellness';
      details.paymentList = [
        {
          benefitDescEng: 'BONESETTER/HERBALIST/ACUPUNCTURE',
          benefitDescSch: '',
          reimbursedCurrency: 'HKD',
          reimbursedAmount: 180,
        },
        {
          benefitDescEng: 'CHILDBIRTH',
          benefitDescSch: '產科',
          reimbursedCurrency: 'HKD',
          reimbursedAmount: 80,
        },
      ];

      const expected = [
        {
          label: 'Total Reimbursed amount',
          value: 'HK$5.012',
        },
        {
          label: 'Reimbursed Item 1',
          value: 'BONESETTER/HERBALIST/ACUPUNCTURE HK$180',
        },
        {
          label: 'Reimbursed Item 2',
          value: '產科 HK$80',
        },
        {
          label: 'Settlement date',
          value: '17 Aug 2019',
        },
      ];

      const actual = claimSubmissionDetails(details, {
        locale: 'zh-HK',
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('patientDetails', () => {
    it('should return claim details for Pending claims', () => {
      const patientName = 'dummy';
      const contactNumber = '123';
      const expected = [
        {
          label: 'Patient name',
          value: 'dummy',
        },
      ];

      const actual = patientDetails(patientName, contactNumber, null);

      expect(actual).toEqual(expected);
    });
  });

  describe('claimDetailsWithIntl with non cashless', () => {
    let details;
    beforeEach(() => {
      details = {
        claimItemCategoryCode: 'Wellness',
        claimAmountOtherInsurer: 123,
        consultationType: 'dummy',
        diagnosis: 'Abscess',
        consultationDate: '01 Aug 2019',
        receiptAmount: 123.01,
        isCashlessClaim: false,
      };
    });
    it('should return claim details', () => {
      const expected = [
        {
          label: 'Consultation type',
          value: 'dummy',
        },
        {
          label: 'Consultation date',
          value: '01 Aug 2019',
        },
        {
          label: 'Claim amount',
          value: 'HK$123.01',
        },
        {
          label: 'Claim amount (other insurer)',
          value: 'HK$ 123',
        },
      ];

      const actual = claimDetailsWithIntl(details, null);

      expect(actual).toEqual(expected);
    });

    it('should return claim details with maternity type', () => {
      details.isMaternity = true;
      const expected = [
        {
          label: 'Consultation type',
          value: 'dummy',
        },
        {
          label: 'Consultation date',
          value: '01 Aug 2019',
        },
        {
          label: 'Claim amount',
          value: 'HK$123.01',
        },
        {
          label: 'Claim amount (other insurer)',
          value: 'HK$ 123',
        },
        {
          label: 'Benefit Type',
          value: 'Maternity',
        },
      ];

      const actual = claimDetailsWithIntl(details, null);

      expect(actual).toEqual(expected);
    });

    it('should return claim details without Recept Amount', () => {
      details.isCashlessClaim = true;
      details.claimItemCategoryCode = 'Outpatient';

      const expected = [
        {
          label: 'Consultation type',
          value: 'dummy',
        },
        {
          label: 'Consultation date',
          value: '01 Aug 2019',
        },
      ];

      const actual = claimDetailsWithIntl(details, null);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFileUrl', () => {
    it('should get url for pdf file', async () => {
      URL.createObjectURL = jest.fn(() => 'blob url');
      global.Blob = jest.fn(() => ({
        type: 'application/pdf',
      }));
      fetchFile.mockReturnValue(Promise.resolve('blob response'));

      const actual = await getFileUrl('application/pdf', '/testing');

      expect(fetchFile).toHaveBeenCalledWith('/testing');
      expect(global.Blob).toHaveBeenCalledWith(['blob response'], {
        type: 'application/pdf',
      });
      expect(actual).toBe('blob url');
    });

    it('should get url for file other than pdf', async () => {
      URL.createObjectURL = jest.fn(() => 'blob url');
      global.Blob = jest.fn(() => ({
        type: 'image/png',
      }));
      fetchFile.mockReturnValue(Promise.resolve('blob response'));

      const actual = await getFileUrl('image/png', '/testing');

      expect(fetchFile).toHaveBeenCalledWith('/testing');
      expect(global.Blob).toHaveBeenCalledWith(['blob response'], {
        type: 'image/png',
      });
      expect(actual).toBe('blob url');
    });
  });
});
