import errorDetails from '../util';

describe('Error utils', () => {
  it('Should provide error object for given key', () => {
    const errorObject = {
      'error-1': {
        errorState: true,
      },
    };
    const expected = {
      errorState: true,
    };

    const actual = errorDetails(errorObject, 'error-1');

    expect(actual).toEqual(expected);
  });

  it('Should provide default error object when given key is not available', () => {
    const errorObject = {};
    const expected = {
      errorState: false,
    };

    const actual = errorDetails(errorObject, 'error-1');

    expect(actual).toEqual(expected);
  });
});
