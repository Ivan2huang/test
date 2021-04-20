import { updateError } from '../action';

describe('Error Action', () => {
  it('Should update Error state action', () => {
    const expected = {
      type: 'UPDATE_ERROR',
      payload: {
        id: 'error-1',
        errorState: true,
      },
    };

    const actual = updateError('error-1', true);

    expect(actual).toEqual(expected);
  });
});
