import {
  getTermsConditions,
  updateTermsConditions,
  acceptTerms,
} from '../action';

describe('Terms and Conditions action', () => {
  it('should generate get Terms and Conditions action', () => {
    const expected = {
      type: 'GET_TERMS_CONDITIONS',
      payload: {
        alreadyAcceptedTerms: true,
      },
    };

    const actual = getTermsConditions(true);

    expect(actual).toEqual(expected);
  });

  it('should generate update Terms and conditions action', () => {
    const expected = {
      type: 'UPDATE_TERMS_CONDITIONS',
      payload: { content: 'Terms and conditions content' },
    };

    const actual = updateTermsConditions('Terms and conditions content');

    expect(actual).toEqual(expected);
  });

  it('should generate accept Terms action', () => {
    const expected = {
      type: 'ACCEPT_TERMS',
      payload: {},
    };

    const actual = acceptTerms();

    expect(actual).toEqual(expected);
  });
});
