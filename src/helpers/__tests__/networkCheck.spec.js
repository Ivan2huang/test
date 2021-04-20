import checkNetworkConnectivity from '../networkCheck';

describe('Network check', () => {
  let onLineGetter;

  beforeEach(() => {
    onLineGetter = jest.spyOn(window.navigator, 'onLine', 'get');
  });

  it('should throw error when no internet is available', () => {
    onLineGetter.mockReturnValue(false);

    expect(() => {
      checkNetworkConnectivity();
    }).toThrowError('No internet connection');
  });

  it('should not throw error when internet is available', () => {
    onLineGetter.mockReturnValue(true);

    expect(() => {
      checkNetworkConnectivity();
    }).not.toThrowError('No internet connection');
  });
});
