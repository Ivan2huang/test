import { getPrivacyPolicy, updatePrivacyPolicy } from '../action';

describe('Privacy policy action', () => {
  it('should generate get Privacy policy action', () => {
    const expected = {
      type: 'GET_PRIVACY_POLICY',
      payload: {},
    };

    const actual = getPrivacyPolicy();

    expect(actual).toEqual(expected);
  });

  it('should generate update Privacy policy action', () => {
    const expected = {
      type: 'UPDATE_PRIVACY_POLICY',
      payload: { content: 'Privacy policy' },
    };

    const actual = updatePrivacyPolicy('Privacy policy');

    expect(actual).toEqual(expected);
  });
});
