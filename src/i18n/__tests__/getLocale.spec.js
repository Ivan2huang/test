import getLocale from '../getLocale';

jest.mock('../../appContext', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    get: () => 'en-HK',
  })),
}));

describe('GetLocale', () => {
  it('should return locale', () => {
    expect(getLocale()).toBe('en-HK');
  });
});
