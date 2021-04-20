import { startLoader, stopLoader } from '../action';

describe('Loader Action', () => {
  it('should create start loader action', () => {
    const expected = {
      type: 'START_LOADER',
      payload: {
        id: 'loader-1',
        message: 'loading...',
      },
    };

    const actual = startLoader('loader-1', 'loading...');

    expect(actual).toEqual(expected);
  });

  it('should create stop loader action', () => {
    const expected = {
      type: 'STOP_LOADER',
      payload: {
        id: 'loader-1',
      },
    };

    const actual = stopLoader('loader-1');

    expect(actual).toEqual(expected);
  });
});
