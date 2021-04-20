import { updateLanguagePreference } from '../action';

describe('Settings actions', () => {
  it('should create update language preference action', () => {
    const setLocaleCallback = jest.fn();
    const expected = {
      type: 'UPDATE_LANGUAGE_PREFERENCE',
      payload: {
        language: 'en-HK',
        setLocaleCallback,
      },
    };

    const actual = updateLanguagePreference('en-HK', setLocaleCallback);

    expect(actual).toEqual(expected);
  });
});
