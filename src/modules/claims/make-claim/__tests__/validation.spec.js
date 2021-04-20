import {
  validate,
  validateAnotherInsurerAmount,
  validateReceiptAmount,
} from '../validation';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatAmount: jest.fn((intl, amount) => amount),
}));

describe('MakeClaim Validation', () => {
  describe('Claim', () => {
    describe('Another Insurer Amount', () => {
      it('should return an error message if other insurer is zero', () => {
        const expected = {
          id:
            'claims.makeClaimForm.validations.greaterThanZero.otherInsurerAmount',
          defaultMessage: 'Amount should be greater than 0',
        };

        const actual = validateAnotherInsurerAmount(
          '0',
          {
            claim: {
              receiptAmount: '',
            },
          },
          {},
        );

        expect(actual).toStrictEqual(expected);
      });

      it('should return error message if other insurer amount is greater than receipt amount', () => {
        const expected = {
          id: 'claims.makeClaimForm.otherInsurerAmount.helperText',
          defaultMessage: 'Must be lower than receipt amount',
        };

        const actual = validateAnotherInsurerAmount(
          '1,234',
          {
            claim: { receiptAmount: '123' },
          },
          {},
        );

        expect(actual).toStrictEqual(expected);
      });

      it('should not return error message if other insurer amount is less than receipt amount', () => {
        const actual = validateAnotherInsurerAmount(
          '123',
          {
            claim: { receiptAmount: '1,234' },
          },
          {},
        );

        expect(actual).toBe('');
      });
    });

    describe('Receipt Amount', () => {
      it('should return an error message if amount is zero', () => {
        const expected = {
          id: 'claims.makeClaimForm.validations.greaterThanZero.receiptAmount',
          defaultMessage: 'Amount should be greater than 0',
        };

        const actual = validateReceiptAmount('0', undefined, {
          maxReceiptAmount: 10,
        });

        expect(actual).toStrictEqual(expected);
      });

      it('should return error message if receipt amount is greater than max receipt amount', () => {
        const expected = {
          id: 'claims.makeClaimForm.validations.max.receiptAmount',
          defaultMessage:
            'For amounts above HK$ 800 submit a physical claim forms',
          values: { maxReceiptAmount: 800 },
        };

        const actual = validateReceiptAmount('1,234', undefined, {
          maxReceiptAmount: 800,
        });

        expect(actual).toStrictEqual(expected);
      });

      it('should not return error message if receipt amount is less than max receipt amount', () => {
        const actual = validateReceiptAmount('123', undefined, {
          maxReceiptAmount: 800,
        });

        expect(actual).toBe('');
      });

      it('should not return error message if receipt amount is equal to max receipt amount', () => {
        const actual = validateReceiptAmount('800', undefined, {
          maxReceiptAmount: 800,
        });

        expect(actual).toBe('');
      });

      it('should not return error message if max receipt amount is not present', () => {
        const actual = validateReceiptAmount('123', undefined, {});

        expect(actual).toBe('');
      });
    });
  });

  describe('Receipts', () => {
    it('should return error if no receipt is uploaded', () => {
      const values = {
        receipts: {
          files: [],
        },
      };
      const props = {};
      const expected = {
        _error: true,
      };

      const actual = validate(values, props);

      expect(actual.receipts.files).toEqual(expected);
    });

    it('should not return error if at least one receipt is uploaded', () => {
      const values = {
        receipts: {
          files: [{ name: 'test.png' }],
        },
      };
      const props = {};

      const actual = validate(values, props);

      expect(actual.receipts).toBeUndefined();
    });
  });

  describe('Referral Letter', () => {
    it('should return error if no referral letter is uploaded when referral letter is required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
      };
      const props = { referralRequired: true };
      const expected = {
        _error: true,
      };

      const actual = validate(values, props);

      expect(actual.referral.files).toEqual(expected);
    });

    it('should not return error when referral letter is not required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
      };
      const props = { referralRequired: false };

      const actual = validate(values, props);

      expect(actual.referral).toBeUndefined();
    });

    it('should not return error if one referral letter is uploaded when referral letter is required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [{ name: 'test.png' }] },
      };
      const props = { referralRequired: true };

      const actual = validate(values, props);

      expect(actual.referral).toBeUndefined();
    });
  });

  describe('Settlement Advice', () => {
    it('should return error when settlement is required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
        settlementAdvices: { files: [] },
      };
      const props = { anotherInsurerEnabled: true };

      const actual = validate(values, props);

      const expected = {
        _error: true,
      };

      expect(actual.settlementAdvices.files).toEqual(expected);
    });

    it('should not return error when settlement is not required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
        settlementAdvices: { files: [] },
      };
      const props = { anotherInsurerEnabled: false };

      const actual = validate(values, props);

      expect(actual.settlementAdvices).toBeUndefined();
    });

    it('should not return error when one settlement advice is uploaded', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
        settlementAdvices: { files: ['test.png'] },
      };
      const props = { anotherInsurerEnabled: true };

      const actual = validate(values, props);

      expect(actual.settlementAdvices).toBeUndefined();
    });
  });

  describe('Prescription / Supporing Documents', () => {
    it('should return error when prescription is required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
        settlementAdvices: { files: [] },
        prescriptions: { files: [] },
      };
      const props = { isChineseHerbalist: true };

      const actual = validate(values, props);

      const expected = {
        _error: true,
      };

      expect(actual.prescriptions.files).toEqual(expected);
    });

    it('should not return error when prescription is not required', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
        settlementAdvices: { files: [] },
        prescriptions: { files: [] },
      };
      const props = { isChineseHerbalist: false };

      const actual = validate(values, props);

      expect(actual.prescriptions).toBeUndefined();
    });

    it('should not return error when one prescription is uploaded', () => {
      const values = {
        receipts: { files: [] },
        referral: { files: [] },
        settlementAdvices: { files: [] },
        prescriptions: { files: ['test.png'] },
      };
      const props = { isChineseHerbalist: true };

      const actual = validate(values, props);

      expect(actual.prescriptions).toBeUndefined();
    });
  });
});
